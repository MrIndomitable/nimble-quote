const chance = require('chance').Chance();

module.exports = {
  anAuction: (details = []) => ({
    suppliers: [{email: chance.email()}],
    subject: chance.sentence(),
    message: chance.paragraph(),
    issueDate: chance.date(),
    details
  })
};