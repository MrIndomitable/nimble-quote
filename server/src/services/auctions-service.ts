import { v4 as uuid } from 'uuid';
import { Guid } from '../types/common';
import { IAuctionsDao } from '../dao/auctions-dao';
import {
  TAuctionDTO,
  TAuction,
  TComponentDTO,
  TComponent,
  TSupplier,
  TOffersDTO,
  TOfferDTO,
  TPurchaseOrderDTO,
  TSupplierDTO, TOffer
} from '../types/auctions';
import {
  TComponentsResult,
  TComponentsWithOffersResult,
  TComponentWithOffersResult,
  ComponentStatus,
  TComponentResult,
  TAuctionsResult,
  TAuctionResult
} from '../types/response';
import { ISuppliersDao } from '../dao/suppliers-dao';
import { IMailService } from '../mailing-service/send-grid-mailing-service';
import { IOffersDao } from '../dao/offers-dao';
import { IUsersService } from './users-service';
import { sign } from 'jsonwebtoken';
import config from '../config/config';
import { OrderStatus } from '../dao/orders-dao';

interface IAuctionsService {
  addAuction: (userId: Guid, auction: TAuctionDTO) => Promise<Guid>;
  addOffer: (supplierId: Guid, offers: TOffersDTO) => Promise<void>;
  addPurchaseOrder: (userId: Guid, order: TPurchaseOrderDTO) => Promise<void>;
  getById: (id: Guid) => Promise<TAuctionResult>;
  getAll: (userId: Guid) => Promise<TAuctionsResult>;
  getComponents: () => Promise<TComponentsResult>;
  getComponentById: (id: Guid) => Promise<TComponentsWithOffersResult>;
}

export const AuctionsService = (auctionsDao: IAuctionsDao,
                                suppliersDao: ISuppliersDao, // FIXME should probably be suppliersService
                                offersDao: IOffersDao,
                                usersService: IUsersService,
                                mailingService: IMailService): IAuctionsService => {
  const getOrCreateSuppliers = async(userId: Guid, suppliers: TSupplierDTO[]): Promise<TSupplier[]> => {
    const existingSupplierIds = suppliers.filter(({ id }) => !!id).map(({ id }) => id);
    const newSuppliers = suppliers.filter(({ id }) => !id);
    const newSupplierIds = await Promise.all(newSuppliers.map(({ email }) => {
      return suppliersDao.addSupplier(userId, { id: uuid(), email });
    }));

    const allSupplierIds = [...existingSupplierIds, ...newSupplierIds];

    return Promise.all(allSupplierIds.map((id: Guid) => {
      return suppliersDao.getSupplierById(userId, id);
    }));
  };

  const addAuction = async(userId: Guid, auctionDTO: TAuctionDTO): Promise<Guid> => {
    const { message, subject } = auctionDTO;
    const id = uuid();
    const components: TComponent[] = auctionDTO.bom.components.map(toComponentOf(id));
    const [user, suppliers] = await Promise.all([
      usersService.findById(userId),
      getOrCreateSuppliers(userId, auctionDTO.suppliers)
    ]);

    const auction: TAuction = {
      id,
      userId,
      suppliers,
      message,
      subject,
      bom: {
        components
      },
      purchaseOrders: []
    };
    auctionsDao.addAuction(userId, auction);

    const emails = suppliers.map((supplier: TSupplier) => ({
      supplier,
      buyer: { email: user.email },
      offerLink: `https://nimble-quote.herokuapp.com/offer?t=${id}_${supplier.id}`
    }));

    Promise.all(emails.map(email => mailingService.sendOfferQuoteEmail(email)))
      .then(e => console.log('ERROR while sending mail', e));

    return id;
  };

  const getById = async(id: Guid): Promise<TAuctionResult> => {
    const auction = await auctionsDao.getAuctionById(id);
    if (!auction) return null;
    return toAuctionResult(auction);
  };

  const getAll = async(userId: Guid): Promise<TAuctionsResult> => {
    const auctions = await auctionsDao.getAuctions(userId);
    return { auctions: auctions.map(toAuctionResult) };
  };

  const getComponents = async(): Promise<TComponentsResult> => {
    const components = await auctionsDao.getComponents();
    return { components: components.map(toComponentResult) };
  };

  const getComponentById = async (id: Guid): Promise<TComponentsWithOffersResult> => {
    const component = await auctionsDao.getComponentById(id);

    if (!component) {
      return { components: [] };
    }

    return {
      components: [toComponentWithOffersResult(component)]
    };
  };

  const addOffer = async (supplierId: Guid, offers: TOffersDTO): Promise<void> => {
    const toOffer = (offerDTO: TOfferDTO): TOffer => {
      const {componentId, quantity, price, partDate, supplyDate} = offerDTO;
      return {
        id: uuid(),
        supplierId,
        componentId,
        quantity,
        price,
        partDate,
        supplyDate
      };
    };

    auctionsDao.addOffer(supplierId, offers.components.map(toOffer));

    const [offer] = offers.components;
    const component = await auctionsDao.getComponentById(offer.componentId);
    const { userId } = await auctionsDao.getAuctionById(component.auctionId);

    const [user, supplier] = await Promise.all([
      usersService.findById(userId),
      suppliersDao.getSupplierById(userId, supplierId)
    ]);

    mailingService.sendNewOfferNotification({
      buyer: {
        email: user.email, displayName: user.displayName
      },
      supplier: {
        email: supplier.email, displayName: supplier.email // todo: should be display name
      },
      offerLink: `https://nimble-quote.herokuapp.com/components/${component.id}`
    }).then(e => console.log('ERROR while sending mail', e));;
  };

  const getSuppliersForOrder = async (userId: Guid, order: TPurchaseOrderDTO): Promise<TSupplier[]> => {
    const offerIds = order.details.map(detail => detail.offerId);
    const supplierIds = offersDao.getSuppliersByOffers(offerIds);
    return Promise.all(supplierIds.map(supplierId => suppliersDao.getSupplierById(userId, supplierId)));
  };

  const addPurchaseOrder = async (userId: Guid, order: TPurchaseOrderDTO): Promise<void> => {
    const id = uuid();
    auctionsDao.addPurchaseOrder(Object.assign({}, order, { id, status: OrderStatus.NEW }));

    const purchaseToken = sign({ orderId: id }, config.email.tokenEncryptionKey);

    const [user, suppliersForOrder] = await Promise.all([
      usersService.findById(userId),
      getSuppliersForOrder(userId, order)
    ]);

    const emails = suppliersForOrder.map(supplier => ({
      supplier: {
        displayName: supplier.email, // TODO should be name or email
        email: supplier.email
      },
      company: {
        email: user.email
      },
      link: `https://nimble-quote.herokuapp.com/view?order=${purchaseToken}`
    }));

    Promise.all(emails.map(email => mailingService.sendPurchaseOrder(email)))
      .then(e => console.log('ERROR while sending mail', e));
  };

  return {
    addAuction,
    addOffer,
    addPurchaseOrder,
    getById,
    getAll,
    getComponents,
    getComponentById
  };
};

const toComponentOf = (auctionId: Guid) => (component: TComponentDTO): TComponent => {
  const { partNumber, manufacture, targetPrice, quantity, supplyDate } = component;
  return {
    partNumber,
    manufacture,
    targetPrice,
    quantity,
    supplyDate,
    id: uuid(),
    offers: [],
    auctionId,
    purchaseOrder: null
  };
};

const toAuctionResult = (auction: TAuction): TAuctionResult => {
  const { id, subject, message, bom, suppliers } = auction;

  return {
    id,
    subject,
    message,
    bom: { components: bom.components.map(toComponentResult) },
    suppliers: suppliers.map(toSupplierResult)
  };
};

const toSupplierResult = ({ id, email }: TSupplier) => ({ id, email });

const toComponentResult = (component: TComponent): TComponentResult => {
  const { id, manufacture, partNumber, quantity, supplyDate, targetPrice, offers, auctionId, purchaseOrder } = component;

  const offersCount = !!offers ? offers.length : 0;

  const getStatus = () => {
    if (purchaseOrder && purchaseOrder.status === OrderStatus.ACKNOWLEDGE) {
      return ComponentStatus.ARCHIVED;
    } else if (purchaseOrder) {
      return ComponentStatus.IN_PURCHASE;
    }

    if (offersCount > 0) {
      return ComponentStatus.HAS_OFFERS;
    }

    return ComponentStatus.PENDING;
  };

  return {
    id,
    status: getStatus(),
    manufacture,
    partNumber,
    quantity,
    targetPrice,
    date: supplyDate,
    offersCount,
    auctionId
  };
};

const toComponentWithOffersResult = (component: TComponent): TComponentWithOffersResult => {
  return Object.assign({}, toComponentResult(component), { offers: component.offers });
};
