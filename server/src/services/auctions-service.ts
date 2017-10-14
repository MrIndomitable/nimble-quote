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

interface IAuctionsService {
  addAuction: (auction: TAuctionDTO) => Guid;
  addOffer: (supplierId: Guid, offers: TOffersDTO) => void;
  addPurchaseOrder: (order: TPurchaseOrderDTO) => void;
  getById: (id: Guid) => TAuctionResult;
  getAll: () => TAuctionsResult;
  getComponents: () => TComponentsResult;
  getComponentById: (id: Guid) => TComponentsWithOffersResult;
}

export const AuctionsService = (auctionsDao: IAuctionsDao,
                                suppliersDao: ISuppliersDao, // FIXME should probably be suppliersService
                                offersDao: IOffersDao,
                                mailingService: IMailService): IAuctionsService => {
  function getOrCreateSuppliers(suppliers: TSupplierDTO[]) {
    return suppliers.map(({ id, email }) => {
      if (!id) {
        return {
          id: suppliersDao.addSupplier('user-id', { id: uuid(), email }),
          email
        }
      }

      return ({
        id,
        email: suppliersDao.getSupplierById('user-id', id).email
      });
    });
  }

  const addAuction = (auctionDTO: TAuctionDTO): Guid => {
    const { message, subject } = auctionDTO;
    const id = uuid();
    const components: TComponent[] = auctionDTO.bom.components.map(toComponentOf(id));
    const suppliers = getOrCreateSuppliers(auctionDTO.suppliers);

    auctionsDao.addAuction(({
      id,
      suppliers,
      message,
      subject,
      bom: {
        components
      },
      purchaseOrders: []
    }));

    suppliers.forEach((supplier: TSupplier) => {
      mailingService.sendOfferQuoteEmail({
        supplier,
        buyer: { email: 'info@nimble-quote.com' },
        offerLink: `https://nimble-quote.herokuapp.com/offer?t=${id}_${supplier.id}`
      })
    });

    return id;
  };

  const getById = (id: Guid): TAuctionResult => {
    const auction = auctionsDao.getAuctionById(id);
    if (!auction) return null;
    return toAuctionResult(auction);
  };

  const getAll = (): TAuctionsResult => {
    return { auctions: auctionsDao.getAuctions().map(toAuctionResult) };
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

  const addOffer = (supplierId: Guid, offers: TOffersDTO): void => {
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
    // TODO send mail to user
  };

  const getSuppliersForOrder = (order: TPurchaseOrderDTO): TSupplier[] => {
    const offerIds = order.details.map(detail => detail.offerId);
    const supplierIds = offersDao.getSuppliersByOffers(offerIds);
    return supplierIds.map(supplierId => suppliersDao.getSupplierById('user-id', supplierId));
  };

  const addPurchaseOrder = (order: TPurchaseOrderDTO): void => {
    const id = uuid();
    auctionsDao.addPurchaseOrder(Object.assign({}, order, { id }));

    getSuppliersForOrder(order).forEach(supplier => {
      const poEmail = {
        supplier: {
          displayName: supplier.email, // TODO should be name or email
          email: supplier.email
        },
        company: {
          email: 'info@nimble-quote.com' // FIXME should be the email of current logged user
        },
        order: {
          id
        }
      };

      mailingService.sendPurchaseOrder(poEmail);
    });

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
    if (purchaseOrder) {
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
