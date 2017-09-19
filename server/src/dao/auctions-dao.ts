import { TAuction, TComponent } from '../types/auctions';

export interface IAuctionsDao {
  addAuction: (auction: TAuction) => void;
  getAuctions: () => TAuction[];
  getComponents: () => TComponent[];
}

export const AuctionsDao = (): IAuctionsDao => {
  const auctions: TAuction[] = [];
  const components: { [componentId: string]: TComponent } = {};

  return {
    addAuction: (auction: TAuction) => {
      auctions.push(auction);
      auction.bom.components.forEach(comp => components[comp.id] = comp);
    },
    getAuctions: () => [...auctions],
    getComponents: (): TComponent[] => Object.keys(components).map(key => components[key])
  }
};
