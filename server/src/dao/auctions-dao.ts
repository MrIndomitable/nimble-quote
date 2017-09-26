import { TAuction, TComponent } from '../types/auctions';
import { Guid } from '../types/common';

export interface IAuctionsDao {
  addAuction: (auction: TAuction) => void;
  getAuctions: () => TAuction[];
  getComponents: () => TComponent[];
  getComponentById: (id: Guid) => TComponent;
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
    getComponents: (): TComponent[] => Object.keys(components).map(key => components[key]),
    getComponentById: (id: Guid): TComponent => components[id]
  }
};
