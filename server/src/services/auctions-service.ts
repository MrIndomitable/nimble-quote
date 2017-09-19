import { Guid } from '../types/common';
import {
  TAuctionDTO,
  TAuction,
  TComponentDTO,
  TComponentsResult,
  ComponentStatus,
  TComponent,
  TSupplier
} from '../types/auctions';
import { v4 as uuid } from 'uuid';
import { IAuctionsDao } from '../dao/auctions-dao';

interface IAuctionsService {
  addAuction: (auction: TAuctionDTO) => Guid;
  getById: (id: Guid) => TAuction;
  getAll: () => TAuction[];
  getComponents: () => TComponentsResult;
}

export const AuctionsService = (auctionsDao: IAuctionsDao): IAuctionsService => {
  const addAuction = (auctionDTO: TAuctionDTO): Guid => {
    const toComponent = (component: TComponentDTO) => {
      const { partNumber, manufacture, targetPrice, quantity, supplyDate } = component;
      const { offers } = component as any; // FIXME this is not actually coming from from client should be removed
      return ({ partNumber, manufacture, targetPrice, quantity, supplyDate, id: uuid(), offers: offers || [] });
    };

    const { suppliers, message, subject } = auctionDTO;
    const id = uuid();
    const components: TComponent[] = auctionDTO.bom.components.map(toComponent);
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

  return {
    addAuction,
    getById,
    getAll,
    getComponents
  }
};

const toComponentResult = (component: TComponent) => {
  const { id, manufacture, partNumber, quantity, supplyDate, targetPrice, offers } = component;

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
    offersCount
  };
};
