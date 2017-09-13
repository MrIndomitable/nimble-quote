import { Guid } from '../types/common';
import { TAuctionDTO, TAuction, TComponent, TComponentDTO } from '../types/auctions';
import { v4 as uuid } from 'uuid';

interface IAuctionsService {
  addAuction: (auction: TAuctionDTO) => Guid;
  getById: (id: Guid) => TAuction;
  getAll: () => TAuction[];
}

export const AuctionsService: () => IAuctionsService = () => {
  const auctions: TAuction[] = [];

  const addAuction: (auction: TAuctionDTO) => Guid = (auctionDTO: TAuctionDTO) => {
    const toComponent = ({ partNumber, manufacture, targetPrice, quantity, supplyDate}: TComponentDTO) => {
      return ({ partNumber, manufacture, targetPrice, quantity, supplyDate, id: uuid(), offers: [] });
    };

    const components: TComponent[] = auctionDTO.bom.components.map(toComponent);

    const id = uuid();
    const auction = ({ ...auctionDTO, bom: { components }, id }) as TAuction;
    auctions.push(auction);

    return id;
  };

  const getById: (id: Guid) => TAuction = (id: Guid) => {
    return auctions.find(auction => auction.id === id);
  };

  const getAll = () => {
    return [...auctions];
  };

  return {
    addAuction,
    getById,
    getAll
  }
};