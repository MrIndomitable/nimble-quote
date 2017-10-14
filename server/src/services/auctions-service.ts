import { v4 as uuid } from 'uuid';
import { Guid } from '../types/common';
import { IAuctionsDao } from '../dao/auctions-dao';
import {
  TAuctionDTO,
  TAuction,
  TComponentDTO,
  TComponent,
  TSupplier,
  TOfferDTO,
  TPurchaseOrderDTO,
  TSupplierDTO
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

interface IAuctionsService {
  addAuction: (auction: TAuctionDTO) => Guid;
  addOffer: (supplierId: Guid, offers: TOfferDTO) => void;
  addPurchaseOrder: (order: TPurchaseOrderDTO) => void;
  getById: (id: Guid) => TAuctionResult;
  getAll: () => TAuctionsResult;
  getComponents: () => TComponentsResult;
  getComponentById: (id: Guid) => TComponentsWithOffersResult;
}

export const AuctionsService = (auctionsDao: IAuctionsDao,
                                suppliersDao: ISuppliersDao,
                                mailingService: any): IAuctionsService => {
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
        offerLink: `https://nimble-quote.herokuapp.com/offer?t=${id}`
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

  const addOffer = (supplierId: Guid, offers: TOfferDTO): void => {
    auctionsDao.addOffer(supplierId, offers.components);
  };

  const addPurchaseOrder = (order: TPurchaseOrderDTO): void => {
    auctionsDao.addPurchaseOrder(Object.assign({}, order, { id: uuid() }));
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
