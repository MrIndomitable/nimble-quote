const chance = require('chance').Chance();

export const anAuction = (components: any[] = []) => ({
  suppliers: [{ email: chance.email() }],
  subject: chance.sentence(),
  message: chance.paragraph(),
  bom: {components}
});

export const anOffer = () => {
  const quantity = chance.integer({ min: 1, max: 1000 });
  const offerPrice = chance.integer({ min: 1, max: 1000 });
  return ({
    supplierEmail: chance.email(),
    partDate: chance.date(),
    supplyDate: chance.date(),
    quantity: quantity,
    offerPrice: offerPrice,
    total: quantity * offerPrice,
  });
};