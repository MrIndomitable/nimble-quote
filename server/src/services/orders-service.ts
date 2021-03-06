import { IOrdersDao } from '../dao/orders-dao';
import { Guid } from '../types/common';
import { IOffersDao } from '../dao/offers-dao';
import { IUserProfileDao } from '../dao/user-profile-dao';
import { IAuctionsDao } from '../dao/auctions-dao';
import { TUserProfile } from './user-profile-service';
import { ISuppliersDao } from '../dao/suppliers-dao';
import { TOffer, TPurchaseOrder } from '../types/auctions';

export const OrdersService = (ordersDao: IOrdersDao,
                              offersDao: IOffersDao,
                              userProfileDao: IUserProfileDao,
                              auctionsDao: IAuctionsDao,
                              supplierDao: ISuppliersDao) => {
  const getUserIdByOrderId = async (order: TPurchaseOrder): Promise<Guid> => {
    const auctionId = order.auctionId;
    const { userId } = await auctionsDao.getAuctionById(auctionId);
    return userId;
  };

  const getCompany = async (order: TPurchaseOrder) => {
    const userId = await getUserIdByOrderId(order);
    const userProfile: TUserProfile = await userProfileDao.getProfileByUserId(userId);

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

  const getComponents = async(order: TPurchaseOrder) => {
    const offers: TOffer[] = await Promise.all(
      order.details.map(detail => offersDao.getOfferById(detail.offerId)) // TODO should be getOffersByIds
    );
    return offers.map(({ id, quantity, price }) => ({
      id,
      description: 'component description', // TODO get part number and manufacture from components dao
      quantity,
      price,
      total: price * quantity
    }));
  };

  const getSupplier = async (order: TPurchaseOrder) => {
    const offerIds = order.details.map(d => d.offerId);
    const [supplierId] = await offersDao.getSuppliersByOffers(offerIds);
    return supplierDao.getSupplierDetails((supplierId));
  };

  const getOrderDetails = async (order: TPurchaseOrder) => {
    const components = await getComponents(order);
    const total = components.reduce((sum, component) => sum + component.total, 0);
    return { components, totals: { total } };
  };

  const getOrderById = async (orderId: Guid): Promise<any> => {
    const order = await ordersDao.getOrderById(orderId);

    const [
      { components, totals },
      company,
      supplier
    ] = await Promise.all([
      getOrderDetails(order),
      getCompany(order),
      getSupplier(order)
    ]);

    return {
      company,
      supplier,
      components,
      totals
    };
  };

  const acknowledgeOrder = async (orderId: Guid): Promise<void> => {
    return ordersDao.acknowledgeOrder(orderId);
  };

  return {
    getOrderById,
    acknowledgeOrder
  };
};