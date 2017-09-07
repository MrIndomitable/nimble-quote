import { Response, Request, Router } from 'express';
import { AuctionsService } from '../services/auctions-service';
import { anAuction } from '../test-data/test-auction';
import { anAuctionDetails } from '../test-data/test-auction-details';

export const ApiRoute = () => {
  const auctionService = AuctionsService();

  auctionService.addAuction(anAuction([
    anAuctionDetails(),
    anAuctionDetails()
  ]));
  auctionService.addAuction(anAuction([
    anAuctionDetails(),
    anAuctionDetails()
  ]));

  const router = Router();

  router.get('/auctions', (req: Request, res: Response) => {
    res.json({ auctions: auctionService.getAll() });
  });

  router.post('/auctions', (req: Request, res: Response) => {
    const auctionId = auctionService.addAuction(req.body);
    res.status(201).json(auctionId);
  });

  router.get('/user-details', (req: any, res: Response) => {
    if (!req.isAuthenticated()) {
      res.json({ isLoggedIn: req.isAuthenticated() });
    } else {
      const { name, email, image } = req.user.google;
      res.json({ name, email, image, isLoggedIn: req.isAuthenticated() });
    }
  });

  return router;
};