const uuid = require('uuid').v4;

const QuotesService = () => {
  const quotes = {};

  const addQuote = (quote) => {
    const id = uuid();
    quotes[id] = Object.assign({}, quote, {id});
    return quotes[id];
  };

  const getById = (id) => {
    return quotes[id];
  };

  const getAll = () => {
    return quotes;
  };

  return {
    addQuote,
    getById,
    getAll
  }
};

module.exports = QuotesService;