const {Router} = require('express');
const QuotesService = require('../services/quotes-service');

const api = () => {
  const quotesService = QuotesService();
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