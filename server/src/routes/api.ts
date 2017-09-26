import { Response, Request, Router } from 'express';
import { AuctionsService } from '../services/auctions-service';
import { anAuction, anOffer, aSupplier } from '../test-data/test-auction';
import { aComponent } from '../test-data/test-auction-details';
import { AuctionsDao } from '../dao/auctions-dao';
import { SendGridMailingService } from '../mailing-service/send-grid-mailing-service';
import { TConfig } from '../config/config';

export const ApiRoute = (config: TConfig) => {
  const auctionService = AuctionsService(AuctionsDao(), SendGridMailingService(config.email.sendGridApiKey));

  auctionService.addAuction(anAuction([
    aComponent(),
    aComponent({ offers: [anOffer(), anOffer()] })
  ], [
    aSupplier(),
    aSupplier(),
    aSupplier(),
    aSupplier()
  ]));
  auctionService.addAuction(anAuction([
    aComponent({ offers: [anOffer()] }),
    aComponent()
  ], [
    aSupplier()
  ]));

  const router = Router();

  router.get('/auctions', (req: Request, res: Response) => {
    res.json({ auctions: auctionService.getAll() });
  });

  router.post('/auctions', (req: Request, res: Response) => {
    const auctionId = auctionService.addAuction(req.body);
    res.status(201).json(auctionId);
  });

  router.get('/components/:id?', (req: Request, res: Response) => {
    const { id } = req.params;
    if (id) {
      res.json(auctionService.getComponentById(id));
    } else {
      res.json(auctionService.getComponents());
    }
  });

  router.get('/offer', (req: Request, res: Response) => {
    res.json(auctionService.getById(req.query.token));
  });

  router.get('/user-details', (req: any, res: Response) => {
    if (!req.isAuthenticated()) {
      res.json({ isLoggedIn: req.isAuthenticated() });
    } else {
      const { name, email, image } = req.user.google;
      res.json({ name, email, image, isLoggedIn: req.isAuthenticated() });
    }
  });

  router.get('*', (req: Request, res: Response) => {
    res.sendStatus(404);
  });

  return router;
};