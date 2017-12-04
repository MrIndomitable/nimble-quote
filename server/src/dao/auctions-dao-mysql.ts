import { IOrdersDao } from './orders-dao';
import { IOffersDao } from './offers-dao';
import { ISuppliersDao } from './suppliers-dao';
import { IAuctionsDao } from './auctions-dao';
import { Guid } from '../types/common';
import { TAuction, TComponent, TOffer, TPurchaseOrder, TSupplier } from '../types/auctions';
import { Database } from './config/configure-mysql';
import { ComponentDaoMysql } from './components-dao-mysql';

const insertAuction = `
  INSERT INTO auctions (id, user_id)
  VALUES (?, ?);
`;

const selectAuctionsByUser = `
  SELECT id, user_id
  FROM auctions 
  WHERE user_id = ?;
`;

const selectAuctionById = `
  SELECT id, user_id 
  FROM auctions 
  WHERE id = ?;
`;

const insertSuppliersInAuction = (n: number) => {
  const values = Array(n).fill('(?, ?)').join(',');
  return `
    INSERT INTO suppliers_in_auction (auction_id, supplier_id)
    VALUES ${values};
  `;
};

const selectSuppliersInAuction = `
  SELECT supplier_id 
  FROM suppliers_in_auction 
  WHERE auction_id = ?;
`;

type TDBAuction = {
  id: Guid;
  message: string;
  subject: string;
  userId: Guid;
};

export const AuctionsDaoMysql = (db: Database,
                                 suppliersDao: ISuppliersDao,
                                 offersDao: IOffersDao,
                                 ordersDao: IOrdersDao): IAuctionsDao => {
  const componentsDao = ComponentDaoMysql(db, offersDao, ordersDao);

  const addAuction = async (userId: Guid, auction: TAuction) => {
    const values = auction.suppliers.map(supplier => [
      auction.id,
      supplier.id
    ]);

    await db.query(insertAuction, [auction.id, userId]);
    await Promise.all([
      componentsDao.addComponentsOf(auction.id, auction.bom.components),
      db.query(insertSuppliersInAuction(auction.suppliers.length), [].concat(...values))
    ]);
  };

  const addOffer = async(supplierId: Guid, offers: TOffer[]): Promise<void> => {
    await offersDao.addOffer(supplierId, offers);
  };

  const addPurchaseOrder = (order: TPurchaseOrder): void => {
    ordersDao.addOrder(order);
  };

  const getAuctionById = async (auctionId: Guid): Promise<TAuction> => {
    const result = await db.query(selectAuctionById, [auctionId]);
    const dbAuction = result.map(toDBAuction).pop();

    if (!dbAuction) return null;
    return toAuction(dbAuction);
  };

  const mapToSuppliers = (userId: Guid) => (rows: any[]): Promise<TSupplier[]> => Promise.all(rows
    .map(row => suppliersDao.getSupplierById(userId, row.supplier_id)));

  const toAuction = async (auction: TDBAuction): Promise<TAuction> => {
    const { id, message, subject, userId } = auction;

    let [components, suppliers]  = await Promise.all([
      componentsDao.getComponentsByAuctionId(id),
      db.query(selectSuppliersInAuction, [id]).then(mapToSuppliers(userId))
    ]);

    const purchaseOrders = await ordersDao.getOrdersByAuctionId(id);

    components = await Promise.all(components.map(async(component) => {
      const offers = await offersDao.getOffersByComponentId(component.id);
      const purchaseOrder = purchaseOrders.find(order => {
        return !!order.details.find(d => d.componentId === component.id);
      });
      return {
        ...component,
        offers,
        purchaseOrder
      };
    }));

    return { id, userId, message, subject, bom: { components }, suppliers, purchaseOrders };
  };

  const toDBAuction = (row: any): TDBAuction => {
    return { id: row.id, userId: row.user_id, subject: 'subject', message: 'message' };
  };

  const getAuctions = async (userId: Guid): Promise<TAuction[]> => {
    const result = await db.query(selectAuctionsByUser, [userId]);
    const userAuctions: TDBAuction[] = result.map(toDBAuction);
    return Promise.all(userAuctions.map(toAuction));
  };

  const getComponents = () => componentsDao.getComponents();

  const getComponentById = (id: Guid): Promise<TComponent> => componentsDao.getComponentById(id);

  return {
    addAuction,
    addOffer,
    getAuctions,
    getAuctionById,
    getComponents,
    getComponentById,
    addPurchaseOrder
  };
};
