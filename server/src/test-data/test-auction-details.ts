const chance = require('chance').Chance();

export const aComponent = () => ({
  partNumber: chance.word(),
  manufacture: chance.word(),
  targetPrice: chance.integer({ min: 1, max: 1000 }),
  quantity: chance.integer({ min: 1, max: 1000 }),
  supplyDate: chance.date()
});