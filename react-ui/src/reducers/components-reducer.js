import {FETCH_AUCTIONS_SUCCESS, FETCH_COMPONENTS_SUCCESS} from '../actions/types';

const addToComponents = (components, component) => ({
  ...components,
  [component.id]: component
});

export const componentsReducer = (components = {}, action) => {
  const copyOfComponents = () => ({...components});

  switch (action.type) {
    case FETCH_AUCTIONS_SUCCESS:
      return action.auctions.reduce((allComponents, auction) => ({
        ...allComponents,
        ...auction.bom.components.reduce(addToComponents, {})
      }), copyOfComponents());
    case FETCH_COMPONENTS_SUCCESS:
      return action.components.reduce(addToComponents, copyOfComponents());
    default:
      return components;
  }
};
