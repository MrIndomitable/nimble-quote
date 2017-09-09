const chance = require('chance').Chance();

export const anAuction = (components: any[] = []) => ({
  suppliers: [{ email: chance.email() }],
  subject: chance.sentence(),
  message: chance.paragraph(),
  bom: {components}
});

export const anOffer = () => ({
});