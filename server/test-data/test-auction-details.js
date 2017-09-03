const chance = require('chance').Chance();

module.exports = {
  anAuctionDetails: () => (      {
    partNumber: chance.word(),
    manufacture: chance.word(),
    targetPrice: chance.integer({min: 1, max: 1000}),
    quantity: chance.integer({min: 1, max: 1000}),
    supplyDate: chance.date()
  })
};