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
import { ISuppliersDao } from "../dao/suppliers-dao";
import { IMailService } from "../mailing-service/send-grid-mailing-service";
import { IOffersDao } from "../dao/offers-dao";
import { IUsersService, TUser } from "./users-service";
import { sign } from 'jsonwebtoken';
import config from '../config/config';
import { OrderStatus } from '../dao/orders-dao';

interface IAuctionsService {
  addAuction: (userId: Guid, auction: TAuctionDTO) => Promise<Guid>;
  addOffer: (supplierId: Guid, offers: TOffersDTO) => Promise<void>;
  addPurchaseOrder: (userId: Guid, order: TPurchaseOrderDTO) => Promise<void>;
  getById: (id: Guid) => Promise<TAuctionResult>;
  getAll: (userId: Guid) => Promise<TAuctionsResult>;
  getComponents: () => TComponentsResult;
  getComponentById: (id: Guid) => TComponentsWithOffersResult;
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
    const suppliers = await getOrCreateSuppliers(userId, auctionDTO.suppliers);

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

    suppliers.forEach((supplier: TSupplier) => {
      mailingService.sendOfferQuoteEmail({
        supplier,
        buyer: { email: 'info@nimble-quote.com' },
        offerLink: `https://nimble-quote.herokuapp.com/offer?t=${id}_${supplier.id}`
      })
    });

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

  const getComponents = (): TComponentsResult => {
    const components = auctionsDao.getComponents().map(toComponentResult);
    return { components };
  };

  const getComponentById = (id: Guid): TComponentsWithOffersResult => {
    const component = auctionsDao.getComponentById(id);

    if (!component) {
      return { components: [] };
    }

    return {
      components: [toComponentWithOffersResult(component)]
    }
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
      }
    };

    auctionsDao.addOffer(supplierId, offers.components.map(toOffer));

    const [offer] = offers.components;
    const component = auctionsDao.getComponentById(offer.componentId);
    const { userId } = await auctionsDao.getAuctionById(component.auctionId);
    const supplier = await suppliersDao.getSupplierById(userId, supplierId);
    usersService.findById(userId).then((user: TUser) => {
      mailingService.sendNewOfferNotification({
        buyer: {
          email: user.email, displayName: user.displayName
        },
        supplier: {
          email: supplier.email, displayName: supplier.email // todo: should be display name
        },
        offerLink: `https://nimble-quote.herokuapp.com/components/${component.id}`
      });
    }).catch(e => console.log('cannot find user', userId, e));
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

    const suppliersForOrder = await getSuppliersForOrder(userId, order);
    suppliersForOrder.forEach(supplier => {
      const poEmail = {
        supplier: {
          displayName: supplier.email, // TODO should be name or email
          email: supplier.email
        },
        company: {
          email: 'info@nimble-quote.com' // FIXME should be the email of current logged user
        },
        link: `https://nimble-quote.herokuapp.com/view?order=${purchaseToken}`
      };

      mailingService.sendPurchaseOrder(poEmail);
    });

    return Promise.resolve();
  };

  return {
    addAuction,
    addOffer,
    addPurchaseOrder,
    getById,
    getAll,
    getComponents,
    getComponentById
  }
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
  }
};

const toAuctionResult = (auction: TAuction): TAuctionResult => {
  const { id, subject, message, bom, suppliers } = auction;

  return {
    id,
    subject,
    message,
    bom: { components: bom.components.map(toComponentResult) },
    suppliers: suppliers.map(toSupplierResult)
  }
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
