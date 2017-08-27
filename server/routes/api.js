const { Router } = require('express');
const bodyParser = require('body-parser');

const api = () => {
  const router = Router();
  router.use(bodyParser.json());

  router.post('/rfp', (req, res) => {
    res.sendStatus(201);
  });

  return router;
};

module.exports = api;