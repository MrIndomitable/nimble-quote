import { Guid } from '../types/common';
import {
  TAuctionDTO,
  TAuction,
  TComponentDTO,
  TComponentsResult,
  ComponentStatus,
  TComponent,
  TSupplier,
  TComponentResult,
  TComponentsWithOffersResult,
  TComponentWithOffersResult
} from '../types/auctions';
import { v4 as uuid } from 'uuid';
import { IAuctionsDao } from '../dao/auctions-dao';

interface IAuctionsService {
  addAuction: (auction: TAuctionDTO) => Guid;
  getById: (id: Guid) => TAuction;
  getAll: () => TAuction[];
  getComponents: () => TComponentsResult;
  getComponentById: (id: Guid) => TComponentsWithOffersResult;
}

export const AuctionsService = (auctionsDao: IAuctionsDao, mailingService?: any): IAuctionsService => {
  const component = (id: Guid): TComponent => ({
    id,
    partNumber: 'part-number',
    manufacture: 'manufacture',
    targetPrice: 540,
    quantity: 320,
    supplyDate: 1234567890,
    offers: [],
    auctionId: '1234'
  });
  auctionsDao.addAuction({
    id: '1234',
    suppliers: [{ id: '123', email: 'm@m.com' }],
    subject: 'hello',
    message: 'message',
    bom: {
      components: [component('1'), component('2'), component('3')]
    }
  });

  const addAuction = (auctionDTO: TAuctionDTO): Guid => {
    const { suppliers, message, subject } = auctionDTO;
    const id = uuid();
    const components: TComponent[] = auctionDTO.bom.components.map(toComponentOf(id));
    const auction: TAuction = ({
      id,
      suppliers: suppliers.map(supplier => supplier as TSupplier),
      message,
      subject,
      bom: {
        components
      }
    });
    auctionsDao.addAuction(auction);

    mailingService.sendOfferQuoteEmail({
      supplier: { email: suppliers[0].email },
      buyer: { email: 'info@nimble-quote.com' },
      offerLink: `https://nimble-quote.herokuapp.com/offer?t=${id}`
    });

    return id;
  };

  const getById = (id: Guid): TAuction => {
    return auctionsDao.getAuctions().find(auction => auction.id === id);
  };

  const getAll = () => {
    return auctionsDao.getAuctions();
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

  return {
    addAuction,
    getById,
    getAll,
    getComponents,
    getComponentById
  }
};

const toComponentOf = (auctionId: Guid) => (component: TComponentDTO): TComponent => {
  const { partNumber, manufacture, targetPrice, quantity, supplyDate } = component;
  const { offers } = component as any; // FIXME this is not actually coming from from client should be removed
  return ({
    partNumber,
    manufacture,
    targetPrice,
    quantity,
    supplyDate,
    id: uuid(),
    offers: offers || [],
    auctionId
  });
};

const toComponentResult = (component: TComponent): TComponentResult => {
  const { id, manufacture, partNumber, quantity, supplyDate, targetPrice, offers, auctionId } = component;

  const offersCount = !!offers ? offers.length : 0;
  const getStatus = () => {
    if (offersCount > 0) {
      return ComponentStatus.HAS_OFFERS;
    } else {
      return ComponentStatus.PENDING;
    }
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
