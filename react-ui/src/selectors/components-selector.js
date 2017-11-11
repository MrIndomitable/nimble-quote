export const isPending = component => component.status === 'PENDING';
export const hasOffers = component => component.status === 'HAS_OFFERS';
export const isImminent = component => component.status === 'IN_PURCHASE';
export const isArchived = component => component.status === 'ARCHIVED';

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
  .reduce((sum, component) => sum + component.offersCount, 0);

export const findComponentById = ({components}, id) => components[id];