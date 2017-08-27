const { Router } = require('express');
const bodyParser = require('body-parser');
const QuotesService = require('../services/quotes-service');

const api = () => {
  const quotesService = QuotesService();
  const router = Router();
  router.use(bodyParser.json());

  router.get('/rfp', (req, res) => {
    res.send(quotesService.getAll());
  });

  router.post('/rfp', (req, res) => {
    res.status(201).send(quotesService.addQuote(req.body));
  });

  return router;
};

module.exports = api;