import { Guid } from '../types/common';
import { TOfferDTO, TPurchaseOrder, TPurchaseOrderDetail, TSupplierDTO } from '../types/auctions';
const chance = require('chance').Chance();

export const anAuction = (components: any[] = [], suppliers: TSupplierDTO[] = []) => ({
  id: chance.guid(),
  suppliers,
  subject: chance.sentence(),
  message: chance.paragraph(),
  bom: { components },
  purchaseOrders: [] as any[]
});

export const aSupplier = (): TSupplierDTO => ({
  email: 'momats@gmail.com'
});

export const anOffer = (componentId: Guid): TOfferDTO => {
  const quantity = chance.integer({ min: 1, max: 1000 });
  const offerPrice = chance.integer({ min: 1, max: 1000 });
  return ({
    componentId,
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