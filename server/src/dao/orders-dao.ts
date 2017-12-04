import { Guid } from '../types/common';
import { TPurchaseOrder } from '../types/auctions';

export interface IOrdersDao {
  addOrder(order: TPurchaseOrder): Promise<void>;
  getOrderById(id: Guid): Promise<TPurchaseOrder>;
  getOrdersByAuctionId(auctionId: Guid): Promise<TPurchaseOrder[]>;
  getOrderByComponentId(componentId: Guid): Promise<TPurchaseOrder>;
  acknowledgeOrder(orderId: Guid): Promise<void>;
}

export enum OrderStatus {
  NEW = 'NEW',
  ACKNOWLEDGE = 'ACKNOWLEDGE'
}

export type TDBPurchaseOrder = {
  auctionId: Guid;
  details: TDBPurchaseOrderDetails[];
  status: OrderStatus;
}

export type TDBPurchaseOrderDetails = {
  componentId: Guid;
  offerId: Guid;
  quantity: number;
}

export const OrdersDao = (): IOrdersDao => {
  const _orders: { [orderId: string]: TDBPurchaseOrder } = {};
  const _ordersByComponents: { [componentId: string]: Guid[] } = {};
  const _ordersByOffers: { [offerId: string]: Guid[] } = {};
  const _ordersByAuctions: { [auctionId: string]: Guid[] } = {};

  const addOrder = async(order: TPurchaseOrder): Promise<void> => {
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

    _orders[id] = { auctionId, details: dbDetails, status: OrderStatus.NEW };
  };

  const getOrderById = async(id: Guid): Promise<TPurchaseOrder> => {
    if (!_orders[id]) return null;

    const { auctionId, details, status } = _orders[id];
    return { id, auctionId, details, status };
  };

  const acknowledgeOrder = async (orderId: Guid): Promise<void> => {
    _orders[orderId].status = OrderStatus.ACKNOWLEDGE;
    return Promise.resolve();
  };

  const getOrdersByAuctionId = (auctionId: Guid): Promise<TPurchaseOrder[]> => {
    return Promise.all((_ordersByAuctions[auctionId] || []).map(getOrderById));
  };

  const getOrderByComponentId = (componentId: Guid): Promise<TPurchaseOrder> => {
    return (_ordersByComponents[componentId] || []).map(getOrderById)[0];
  };

  return {
    addOrder,
    getOrderById,
    getOrdersByAuctionId,
    getOrderByComponentId,
    acknowledgeOrder
  }
};
