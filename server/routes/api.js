const {Router} = require('express');
const QuotesService = require('../services/quotes-service');

const api = () => {
  const quotesService = QuotesService();

  quotesService.addQuote({
    manufacture: 'Intel',
    partNumber: '1234',
    quantity: 15,
    targetPrice: 190
  });
  quotesService.addQuote({
    manufacture: 'Intel-corp',
    partNumber: 'cnud7-cnsud',
    quantity: 37,
    targetPrice: 292
  });
  quotesService.addQuote({
    manufacture: 'HP',
    partNumber: '783nd7ds',
    quantity: 55,
    targetPrice: 170
  });
  quotesService.addQuote({
    manufacture: 'IBM',
    partNumber: 'csdcs-s7dc',
    quantity: 45,
    targetPrice: 99
  });

  const router = Router();

  router.get('/rfp', (req, res) => {
    res.send(quotesService.getAll());
  });

  router.post('/rfp', (req, res) => {
    res.status(201).send(quotesService.addQuote(req.body));
  });

  router.get('/user-details', (req, res) => {
    if (!req.isAuthenticated()) {
      res.json({isLoggedIn: req.isAuthenticated()});
    } else {
      const {name, email, image} = req.user.google;
      res.json({name, email, image, isLoggedIn: req.isAuthenticated()});
    }
  });

  return router;
};

module.exports = api;