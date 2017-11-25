import { TAuction, TComponent, TOffer, TSupplier, TPurchaseOrder } from '../types/auctions';
import { Guid } from '../types/common';
import { IOrdersDao } from './orders-dao';
import { ISuppliersDao } from "./suppliers-dao";
import { IOffersDao } from "./offers-dao";

type TDBAuction = {
  id: Guid;
  message: string;
  subject: string;
  userId: Guid;
};

type TDBComponent = {
  id: Guid;
  partNumber: string;
  manufacture: string;
  targetPrice: number;
  quantity: number;
  supplyDate: number;
  auctionId: Guid;
};

export interface IAuctionsDao {
  addAuction: (userId: Guid, auction: TAuction) => void;
  addOffer: (supplierId: Guid, offers: TOffer[]) => void;
  getAuctionById: (auctionId: Guid) => Promise<TAuction>;
  getAuctions: (userId: Guid) => Promise<TAuction[]>;
  getComponents: () => TComponent[];
  getComponentById: (id: Guid) => TComponent;
  addPurchaseOrder: (order: TPurchaseOrder) => void;
}

export const AuctionsDao = (
  suppliersDao: ISuppliersDao,
  offersDao: IOffersDao,
  ordersDao: IOrdersDao
): IAuctionsDao => {
  const _auctionsByUser: { [userId: string]: Guid[] } = {};
  const _auctions: { [auctionId: string]: TDBAuction } = {};
  const _components: { [componentId: string]: TDBComponent } = {};
  const _componentsByAuction: { [auctionId: string]: Guid[] } = {};
  const _suppliersByAuction: { [auctionId: string]: Guid[] } = {};

  const addAuction = (userId: Guid, auction: TAuction) => {
    _auctionsByUser[userId] = _auctionsByUser[userId] || [];
    _auctionsByUser[userId].push(auction.id);
    _auctions[auction.id] = Object.assign({}, auction, { userId });
    _componentsByAuction[auction.id] = [];
    _suppliersByAuction[auction.id] = [];

    auction.bom.components.forEach(comp => {
      _components[comp.id] = comp;
      _componentsByAuction[auction.id].push(comp.id);
    });

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

  const getAuctionById = (auctionId: Guid): Promise<TAuction> => {
    if (!_auctions[auctionId]) return null;
    return toAuction(_auctions[auctionId]);
  };

  const toAuction = async(auction: TDBAuction): Promise<TAuction> => {
    const { id, message, subject, userId } = auction;

    const components: TComponent[] = _componentsByAuction[id].map(getComponentById);
    const suppliers: TSupplier[] = await Promise.all(_suppliersByAuction[id]
      .map(supplierId => suppliersDao.getSupplierById(auction.userId, supplierId)));

    const purchaseOrders = ordersDao.getOrdersByAuctionId(id);

    return { id, userId, message, subject, bom: { components }, suppliers, purchaseOrders }
  };

  const getAuctions = (userId: Guid): Promise<TAuction[]> => {
    const userAuctions = _auctionsByUser[userId] || [];
    return Promise.all(userAuctions.map(id => toAuction(_auctions[id])));
  };

  const getComponents = () => {
    return Object.keys(_components).map(getComponentById);
  };

  const getComponentById = (id: Guid): TComponent => {
    const { partNumber, manufacture, targetPrice, quantity, supplyDate, auctionId } = _components[id];
    const purchaseOrder = ordersDao.getOrderByComponentId(id);

    return {
      id,
      partNumber,
      manufacture,
      targetPrice,
      quantity,
      supplyDate,
      auctionId,
      offers: offersDao.getOffersByComponentId(id),
      purchaseOrder
    };
  };

  return {
    addAuction,
    addOffer,
    getAuctions,
    getAuctionById,
    getComponents,
    getComponentById,
    addPurchaseOrder
  }
};
