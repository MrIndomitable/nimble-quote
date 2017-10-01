import {FETCH_AUCTIONS_SUCCESS, FETCH_COMPONENTS_SUCCESS} from '../actions/types';

const addComponent = (components, component) => ({
  ...components,
  [component.id]: {
    ...(components[component.id] || {}),
    ...component
  }
});

const copyOf = data => ({...data});

export const componentsReducer = (components = {}, action) => {
  switch (action.type) {
    case FETCH_AUCTIONS_SUCCESS:
      return action.auctions.reduce((allComponents, auction) => {
        return auction.bom.components.reduce(addComponent, allComponents);
      }, copyOf(components));
    case FETCH_COMPONENTS_SUCCESS:
      return action.components.reduce(addComponent, copyOf(components));
    default:
      return components;
  }
};
