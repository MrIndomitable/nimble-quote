import { IOrdersDao } from "../dao/orders-dao";
import { Guid } from "../types/common";
import { IOffersDao } from "../dao/offers-dao";
import { IUserProfileDao } from "../dao/user-profile-dao";
import { IAuctionsDao } from "../dao/auctions-dao";
import { TUserProfile } from "./user-profile-service";

export const OrdersService = (ordersDao: IOrdersDao,
                              offersDao: IOffersDao,
                              userProfileDao: IUserProfileDao,
                              auctionsDao: IAuctionsDao) => {
  const getUserIdByOrderId = (orderId: Guid): Guid => {
    const auctionId = ordersDao.getOrderById(orderId).auctionId;
    return auctionsDao.getAuctionById(auctionId).userId;
  };

  const getOrderById = (orderId: Guid): Promise<any> => {
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

    return userProfileDao.getProfileByUserId(getUserIdByOrderId(orderId))
      .then((userProfile: TUserProfile) => {
        const {
          companyName, contactName, address, city, state, country, zip, phone
        } = userProfile;

        return {
          company: {
            name: companyName,
            contactName,
            address,
            city,
            state,
            country,
            zip,
            phone
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
      });
  };

  return {
    getOrderById
  }
};