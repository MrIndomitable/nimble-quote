import { TAuction, TComponent, TOffer, TSupplier, TPurchaseOrder } from '../types/auctions';
import { Guid } from '../types/common';
import { IOrdersDao } from './orders-dao';
import { ISuppliersDao } from './suppliers-dao';
import { IOffersDao } from './offers-dao';
import { IComponentsDao } from './components-dao';

type TDBAuction = {
  id: Guid;
  message: string;
  subject: string;
  userId: Guid;
};

export interface IAuctionsDao {
  addAuction: (userId: Guid, auction: TAuction) => Promise<void>;
  addOffer: (supplierId: Guid, offers: TOffer[]) => Promise<void>;
  getAuctionById: (auctionId: Guid) => Promise<TAuction>;
  getAuctions: (userId: Guid) => Promise<TAuction[]>;
  getComponents: () => Promise<TComponent[]>;
  getComponentById: (id: Guid) => Promise<TComponent>;
  addPurchaseOrder: (order: TPurchaseOrder) => void;
}

export const AuctionsDao = (suppliersDao: ISuppliersDao,
                            offersDao: IOffersDao,
                            ordersDao: IOrdersDao,
                            componentsDao: IComponentsDao): IAuctionsDao => {
  const _auctionsByUser: { [userId: string]: Guid[] } = {};
  const _auctions: { [auctionId: string]: TDBAuction } = {};
  const _suppliersByAuction: { [auctionId: string]: Guid[] } = {};

  const addAuction = async (userId: Guid, auction: TAuction) => {
    _auctionsByUser[userId] = _auctionsByUser[userId] || [];
    _auctionsByUser[userId].push(auction.id);
    _auctions[auction.id] = Object.assign({}, auction, { userId });
    _suppliersByAuction[auction.id] = [];

    await componentsDao.addComponentsOf(auction.id, auction.bom.components);

    auction.suppliers.forEach(supplier => {
      _suppliersByAuction[auction.id].push(supplier.id);
    });
  };

  const addOffer = async(supplierId: Guid, offers: TOffer[]): Promise<void> => {
    await offersDao.addOffer(supplierId, offers);
  };

  const addPurchaseOrder = (order: TPurchaseOrder): void => {
    ordersDao.addOrder(order);
  };

  const getAuctionById = (auctionId: Guid): Promise<TAuction> => {
    if (!_auctions[auctionId]) return null;
    return toAuction(_auctions[auctionId]);
  };

  const toAuction = async (auction: TDBAuction): Promise<TAuction> => {
    const { id, message, subject, userId } = auction;

    const components: TComponent[] = await componentsDao.getComponentsByAuctionId(id);
    const suppliers: TSupplier[] = await Promise.all(_suppliersByAuction[id]
      .map(supplierId => suppliersDao.getSupplierById(auction.userId, supplierId)));

    const purchaseOrders = await ordersDao.getOrdersByAuctionId(id);

    return { id, userId, message, subject, bom: { components }, suppliers, purchaseOrders };
  };

  const getAuctions = (userId: Guid): Promise<TAuction[]> => {
    const userAuctions = _auctionsByUser[userId] || [];
    return Promise.all(userAuctions.map(id => toAuction(_auctions[id])));
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
