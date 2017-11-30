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
  const _suppliersByAuction: { [auctionId: string]: Guid[] } = {};
  const componentsDao = ComponentDaoMysql(db, offersDao, ordersDao);

  const addAuction = async (userId: Guid, auction: TAuction) => {
    await db.query(insertAuction, [auction.id, userId]);

    _suppliersByAuction[auction.id] = [];

    await componentsDao.addComponentsOf(auction.id, auction.bom.components);

    auction.suppliers.forEach(supplier => {
      _suppliersByAuction[auction.id].push(supplier.id);
    });
  };

  const addOffer = (supplierId: Guid, offers: TOffer[]): void => {
    offersDao.addOffer(supplierId, offers);
  };

  const addPurchaseOrder = (order: TPurchaseOrder): void => {
    ordersDao.addOrder(order);
  };

  const getAuctionById = async(auctionId: Guid): Promise<TAuction> => {
    const result = await db.query(selectAuctionById, [auctionId]);
    const dbAuction = result.map(toDBAuction).pop();

    if (!dbAuction) return null;
    return toAuction(dbAuction);
  };

  const toAuction = async (auction: TDBAuction): Promise<TAuction> => {
    const { id, message, subject, userId } = auction;

    const components: TComponent[] = await componentsDao.getComponentsByAuctionId(id);
    const suppliers: TSupplier[] = await Promise.all(_suppliersByAuction[id]
      .map(supplierId => suppliersDao.getSupplierById(auction.userId, supplierId)));

    const purchaseOrders = ordersDao.getOrdersByAuctionId(id);

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
