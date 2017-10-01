import { TAuction, TComponent, TOffer, TSupplier, TPurchaseOrder } from '../types/auctions';
import { Guid } from '../types/common';

type TDBAuction = {
  id: Guid;
  message: string;
  subject: string;
};

type TDBSupplier = {
  id: Guid;
  email: string;
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

type TDBOffer = {
  id: Guid;
  componentId: Guid;
  price: number;
  quantity: number;
  partDate: number;
}

type TDBPurchaseOrder = {
  auctionId: Guid;
  details: TDBPurchaseOrderDetails[];
}

type TDBPurchaseOrderDetails = {
  componentId: Guid;
  offerId: Guid;
  quantity: number;
}

export interface IAuctionsDao {
  addAuction: (auction: TAuction) => void;
  addOffer: (supplierId: Guid, offers: TOffer[]) => void;
  getAuctions: () => TAuction[];
  getComponents: () => TComponent[];
  getComponentById: (id: Guid) => TComponent;
  addPurchaseOrder: (order: TPurchaseOrder) => void;
}

export const AuctionsDao = (): IAuctionsDao => {
  const _auctions: TDBAuction[] = [];
  const _components: { [componentId: string]: TDBComponent } = {};
  const _componentsByAuction: { [auctionId: string]: Guid[] } = {};
  const _suppliers: { [supplierId: string]: TDBSupplier } = {};
  const _suppliersByAuction: { [auctionId: string]: Guid[] } = {};
  const _offers: { [componentId: string]: { [supplierId: string]: TDBOffer } } = {};
  const _orders: { [orderId: string]: TDBPurchaseOrder } = {};
  const _ordersByComponents: { [componentId: string]: Guid[] } = {};
  const _ordersByOffers: { [offerId: string]: Guid[] } = {};
  const _ordersByAuctions: { [auctionId: string]: Guid[] } = {};

  const addAuction = (auction: TAuction) => {
    _auctions.push(auction);
    _componentsByAuction[auction.id] = [];
    _suppliersByAuction[auction.id] = [];

    auction.bom.components.forEach(comp => {
      _components[comp.id] = comp;
      _offers[comp.id] = {};
      _componentsByAuction[auction.id].push(comp.id);
    });

    auction.suppliers.forEach(supplier => {
      _suppliers[supplier.id] = supplier;
      _suppliersByAuction[auction.id].push(supplier.id);
    });

    auction.suppliers.forEach(supplier => _suppliers[supplier.id] = supplier)
  };

  const addOffer = (supplierId: Guid, offers: TOffer[]): void => {
    offers.forEach((offer: TOffer) => {
      const { componentId } = offer;
      const componentOffers = _offers[componentId] || {};

      if (componentOffers[supplierId]) {
        console.log(`supplier ${supplierId} already oofered on component ${componentId}`);
      } else {
        componentOffers[supplierId] = offer;
      }
    });
  };

  const addPurchaseOrder = (order: TPurchaseOrder): void => {
    const { auctionId, details, id } = order;

    _ordersByAuctions[auctionId] = _ordersByAuctions[auctionId] || [];
    _ordersByAuctions[auctionId].push(id);

    details.forEach(orderDetail => {
      const { componentId, offerId } = orderDetail;
      _ordersByComponents[componentId] = _ordersByComponents[componentId] || [];
      _ordersByComponents[componentId].push(id);

      _ordersByOffers[offerId] = _ordersByOffers[offerId] || [];
      _ordersByOffers[offerId].push(id);
    });

    const dbDetails = details.map(orderDetail => {
      const { componentId, offerId, quantity } = orderDetail;
      return { componentId, offerId, quantity };
    });

    _orders[id] = { auctionId, details: dbDetails };
  };

  const getOrderById = (id: Guid): TPurchaseOrder => {
    if (!_orders[id]) return null;

    const { auctionId, details } = _orders[id];
    return { id, auctionId, details };
  };

  const getAuctions = (): TAuction[] => {
    return _auctions.map(auction => {
      const { id, message, subject } = auction;

      const components: TComponent[] = _componentsByAuction[id].map(getComponentById);
      const suppliers: TSupplier[] = _suppliersByAuction[id].map(getSupplierById);

      const purchaseOrders = (_ordersByAuctions[id] || []).map(getOrderById);

      return { id, message, subject, bom: { components }, suppliers, purchaseOrders }
    });
  };

  const getComponents = () => {
    return Object.keys(_components).map(getComponentById);
  };

  const getComponentById = (id: Guid): TComponent => {
    const { partNumber, manufacture, targetPrice, quantity, supplyDate, auctionId } = _components[id];

    return {
      id,
      partNumber,
      manufacture,
      targetPrice,
      quantity,
      supplyDate,
      auctionId,
      offers: getOffersByComponentId(id)
    };
  };

  const getOffersByComponentId = (componentId: Guid): TOffer[] => {
    const componentOffers = _offers[componentId];
    return Object.keys(componentOffers).map((supplierId: Guid) => {
      const { id, price, quantity, partDate } = componentOffers[supplierId];
      return { id, componentId, supplierId, partDate, supplyDate: null, quantity, price };
    })
  };

  const getSupplierById = (id: Guid): TSupplier => _suppliers[id];

  return {
    addAuction,
    addOffer,
    getAuctions,
    getComponents,
    getComponentById,
    addPurchaseOrder
  }
};
