import { Guid } from '../types/common';
import { TPurchaseOrder } from '../types/auctions';

export type TDBPurchaseOrder = {
  auctionId: Guid;
  details: TDBPurchaseOrderDetails[];
}

export type TDBPurchaseOrderDetails = {
  componentId: Guid;
  offerId: Guid;
  quantity: number;
}

export const OrdersDao = () => {
  const _orders: { [orderId: string]: TDBPurchaseOrder } = {};
  const _ordersByComponents: { [componentId: string]: Guid[] } = {};
  const _ordersByOffers: { [offerId: string]: Guid[] } = {};
  const _ordersByAuctions: { [auctionId: string]: Guid[] } = {};

  const addOrder = (order: TPurchaseOrder): void => {
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

  return {
    addOrder,
    getOrderById,
    getOrdersByAuctionId: (auctionId: Guid) => (_ordersByAuctions[auctionId] || []).map(getOrderById),
    getOrderByComponentId: (componentId: Guid) => (_ordersByComponents[componentId] || []).map(getOrderById)[0]
  }
};
