export const isPending = component => !component.offers || component.offers.length === 0;
export const hasOffers = component => component.offers && component.offers.length > 0;
export const isImminent = component => false;
export const isArchived = component => false;

export const componentsSelector = ({components}, filter) => {
  const allComponents = Object.values(components);

  switch (filter) {
    case 'pending':
      return allComponents.filter(isPending);
    case 'offers':
      return allComponents.filter(hasOffers);
    case 'imminent':
      return allComponents.filter(isImminent);
    case 'archive':
      return allComponents.filter(isArchived);
    default:
      return allComponents
  }
};

export const sumComponents = (state, filter) => componentsSelector(state, filter)
  .reduce((sum, component) => sum + component.offers.length, 0);

export const findComponentById = ({components}, id) => components[id];