import { IOrdersDao } from "../dao/orders-dao";
import { Guid } from "../types/common";
import { IOffersDao } from "../dao/offers-dao";

export const OrdersService = (ordersDao: IOrdersDao, offersDao: IOffersDao) => {

  const getOrderById = (orderId: Guid) => {
    const components = ordersDao.getOrderById(orderId).details.map(orderDetail => {
      const { id, quantity, price } = offersDao.getOfferById(orderDetail.offerId);
      return {
        id,
        description: 'component description', // TODO get part number and manufacture from components dao
        quantity,
        price,
        total: price * quantity
      }
    });

    const total = components.reduce((sum, component) => sum + component.total, 0);

    return {
      company: {
        name: 'Nimble quote',
        contactName: 'Moshe',
        address: '770 Eastern parkway',
        city: 'Brooklyn',
        state: 'NY',
        country: 'USA',
        zip: '11213',
        phone: '1-718-770-770'
      },
      supplier: {
        name: 'Supplier company',
        contactName: 'Menachem',
        address: '770 Eastern parkway',
        city: 'Brooklyn',
        state: 'NY',
        country: 'USA',
        zip: '11213',
        phone: '1-718-770-770'
      },
      components,
      totals: { total }
    }
  };

  return {
    getOrderById
  }
};