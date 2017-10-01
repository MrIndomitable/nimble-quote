import { Guid } from '../types/common';
import { TOffer, TSupplier, TAuction, TPurchaseOrder, TPurchaseOrderDetail } from '../types/auctions';
const chance = require('chance').Chance();

export const anAuction = (components: any[] = [], suppliers: any[] = []): TAuction => ({
  id: chance.guid(),
  suppliers,
  subject: chance.sentence(),
  message: chance.paragraph(),
  bom: { components },
  purchaseOrders: []
});

export const aSupplier = (): TSupplier => ({
  id: chance.guid(),
  email: chance.email()
});

export const anOffer = (componentId: Guid): TOffer => {
  const quantity = chance.integer({ min: 1, max: 1000 });
  const offerPrice = chance.integer({ min: 1, max: 1000 });
  return ({
    id: chance.guid(),
    componentId,
    supplierId: chance.guid(),
    partDate: chance.date(),
    supplyDate: chance.date(),
    quantity: quantity,
    price: offerPrice,
  });
};

export const aPurchaseOrder = (auctionId: Guid, details: TPurchaseOrderDetail[]): TPurchaseOrder => ({
  id: chance.guid(),
  auctionId,
  details
});

export const aPurchaseOrderDetails = (componentId: Guid, offerId: Guid): TPurchaseOrderDetail => ({
  componentId,
  offerId,
  quantity: chance.integer({ min: 1, max: 1000 })
});