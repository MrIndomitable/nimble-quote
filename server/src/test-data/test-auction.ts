import { Guid } from '../types/common';
import { TOffer, TSupplier } from '../types/auctions';
const chance = require('chance').Chance();

export const anAuction = (components: any[] = [], suppliers: any[] = []) => ({
  suppliers,
  subject: chance.sentence(),
  message: chance.paragraph(),
  bom: { components }
});

export const aSupplier = (): TSupplier => ({
  id: chance.guid(),
  email: chance.email()
});

export const anOffer = (componentId: Guid): TOffer => {
  const quantity = chance.integer({ min: 1, max: 1000 });
  const offerPrice = chance.integer({ min: 1, max: 1000 });
  return ({
    componentId,
    supplierId: chance.guid(),
    partDate: chance.date(),
    supplyDate: chance.date(),
    quantity: quantity,
    price: offerPrice,
  });
};