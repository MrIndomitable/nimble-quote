import { IOrdersDao } from '../dao/orders-dao';
import { Guid } from '../types/common';
import { IOffersDao } from '../dao/offers-dao';
import { IUserProfileDao } from '../dao/user-profile-dao';
import { IAuctionsDao } from '../dao/auctions-dao';
import { TUserProfile } from './user-profile-service';

export const OrdersService = (ordersDao: IOrdersDao,
                              offersDao: IOffersDao,
                              userProfileDao: IUserProfileDao,
                              auctionsDao: IAuctionsDao) => {
  const getUserIdByOrderId = async (orderId: Guid): Promise<Guid> => {
    const auctionId = ordersDao.getOrderById(orderId).auctionId;
    return Promise.resolve(auctionsDao.getAuctionById(auctionId).userId);
  };

  const getCompany = async(orderId: Guid) => {
    const userIdByOrderId = await getUserIdByOrderId(orderId);
    const userProfile: TUserProfile = await userProfileDao.getProfileByUserId(userIdByOrderId);

    const { companyName, contactName, address, city, state, country, zip, phone } = userProfile;

    return {
      name: companyName,
      contactName,
      address,
      city,
      state,
      country,
      zip,
      phone
    };
  };

  const getComponents = async (orderId: Guid) => ordersDao.getOrderById(orderId).details.map(orderDetail => {
    const { id, quantity, price } = offersDao.getOfferById(orderDetail.offerId);
    return {
      id,
      description: 'component description', // TODO get part number and manufacture from components dao
      quantity,
      price,
      total: price * quantity
    };
  });

  const getSupplier = async(orderId: Guid) => ({
    name: 'Supplier company',
    contactName: 'Menachem',
    address: '770 Eastern parkway',
    city: 'Brooklyn',
    state: 'NY',
    country: 'USA',
    zip: '11213',
    phone: '1-718-770-770'
  });

  const getOrderDetails = async (orderId: Guid) => {
    const components = await getComponents(orderId);
    const total = components.reduce((sum, component) => sum + component.total, 0);
    return { components, totals: { total } };
  };

  const getOrderById = async (orderId: Guid): Promise<any> => {
    const [
      { components, totals },
      company,
      supplier
    ] = await Promise.all([
      getOrderDetails(orderId),
      getCompany(orderId),
      getSupplier(orderId)
    ]);

    return {
      company,
      supplier,
      components,
      totals
    };
  };

  return {
    getOrderById
  };
};