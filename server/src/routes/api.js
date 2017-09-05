const {Router} = require('express');
const {anAuction} = require('../../test-data/test-auction');
const {AuctionDetailsService, AuctionsService} = require('../services/auctions-service');
const {anAuctionDetails} = require('../../test-data/test-auction-details');

const api = () => {
  const auctionDetailsService = AuctionDetailsService();
  const auctionService = AuctionsService(auctionDetailsService);

  auctionService.addAuction(anAuction([
    anAuctionDetails(),
    anAuctionDetails()
  ]));
  auctionService.addAuction(anAuction([
    anAuctionDetails(),
    anAuctionDetails()
  ]));

  const router = Router();

  router.get('/auctions', (req, res) => {
    res.json(auctionService.getAll());
  });

  router.post('/auctions', (req, res) => {
    res.status(201).json(auctionService.addAuction(req.body));
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