import { IOrdersDao } from './orders-dao';
import { Guid } from '../types/common';
import { TPurchaseOrder } from '../types/auctions';
import { Database } from './config/configure-mysql';

const insertOrder = `
  INSERT INTO orders (id, auction_id, status)
  VALUES (?, ?, ?);
`;

const insertOrderDetails = (n: number) => {
  const values = Array(n).fill('(?, ?)').join(',');
  return `
    INSERT INTO order_details (order_id, offer_id)
    VALUES ${values};
  `;
};

const selectOrderById = `
  SELECT ord.id as order_id, ord.auction_id, ord.status, detail.offer_id, offer.component_id
  FROM orders ord, order_details detail, offers offer
  WHERE ord.id = ?
  AND ord.id = order_id
  AND offer.id = offer_id;
`;

const selectOrdersByAuctionId = `
  SELECT ord.id as order_id, ord.auction_id, ord.status, detail.offer_id, offer.component_id
  FROM orders ord, order_details detail, offers offer
  WHERE ord.auction_id = ?
  AND ord.id = order_id
  AND offer.id = offer_id;
`;

const selectOrdersByComponentId = `
  SELECT ord.id as order_id, ord.auction_id, ord.status, detail.offer_id, offer.component_id
  FROM orders ord, order_details detail, offers offer
  WHERE offer.component_id = ?
  AND ord.id = order_id
  AND offer.id = offer_id;
`;

const updateOrderStatus = `
  UPDATE orders
  SET status = ?
  WHERE id = ?;
`;

enum OrderStatus {
  NEW, ACKNOWLEDGE
}

export const OrdersDaoMysql = (db: Database): IOrdersDao => {
  const addOrder = async(order: TPurchaseOrder): Promise<void> => {
    const values = order.details.map(detail => [
      order.id,
      detail.offerId
    ]);

    await db.query(insertOrder, [order.id, order.auctionId, OrderStatus.NEW]);
    await db.query(insertOrderDetails(order.details.length), [].concat(...values));
  };

  const mapToOrders = (rows: any[]): TPurchaseOrder[] => {
    const ordersByOrderId = rows.reduce((orders, row) => {
      const { id, auction_id, status, offer_id, component_id} = row;
      orders[id] = orders[id] || { id, auctionId: auction_id, status: OrderStatus[status], details: [] };
      orders[id].details.push({ offerId: offer_id, componentId: component_id, quantity: 0 });
      return orders;
    }, {});
    return Object.keys(ordersByOrderId).map(orderId => ordersByOrderId[orderId]);
  };

  const getOrderById = (id: Guid): Promise<TPurchaseOrder> => {
    return db.query(selectOrderById, [id]).then(mapToOrders).then(orders => orders.pop());
  };

  const getOrdersByAuctionId = (auctionId: Guid): Promise<TPurchaseOrder[]> => {
    return db.query(selectOrdersByAuctionId, [auctionId]).then(mapToOrders);
  };

  const getOrderByComponentId = (componentId: Guid): Promise<TPurchaseOrder> => {
    return db.query(selectOrdersByComponentId, [componentId]).then(mapToOrders).then(orders => orders.pop());
  };

  const acknowledgeOrder = (orderId: Guid): Promise<void> => {
    return db.query(updateOrderStatus, [OrderStatus.ACKNOWLEDGE, orderId]);
  };

  return {
    addOrder,
    getOrderById,
    getOrdersByAuctionId,
    getOrderByComponentId,
    acknowledgeOrder
  };
};
