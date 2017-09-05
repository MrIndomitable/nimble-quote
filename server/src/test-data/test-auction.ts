const chance = require('chance').Chance();

export const anAuction = (details: any[] = []) => ({
  suppliers: [{ email: chance.email() }],
  subject: chance.sentence(),
  message: chance.paragraph(),
  issueDate: chance.date(),
  details
});