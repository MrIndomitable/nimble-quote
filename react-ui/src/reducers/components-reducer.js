import {FETCH_AUCTIONS_SUCCESS} from '../actions/types';

const componentsInBom = (auction) => auction.bom.components.reduce((components, component) => ({
  ...components,
  [component.id]: {
    ...component,
    auctionId: auction.id
  }
}), {});

export const componentsReducer = (components = {}, action) => {
  const copyOfComponents = () => ({...components});

  switch (action.type) {
    case FETCH_AUCTIONS_SUCCESS:
      return action.auctions.reduce((allComponents, auction) => ({
        ...allComponents,
        ...componentsInBom(auction)
      }), copyOfComponents());
    default:
      return components;
  }
};
