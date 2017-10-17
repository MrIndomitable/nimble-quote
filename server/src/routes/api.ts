import { Response, Request, NextFunction, Router } from 'express';
import { AuctionsService } from '../services/auctions-service';
import { AuctionsDao } from '../dao/auctions-dao';
import { SendGridMailingService } from '../mailing-service/send-grid-mailing-service';
import { TConfig } from '../config/config';
import { SuppliersDao } from "../dao/suppliers-dao";
import { SuppliersService } from "../services/suppliers-service";
// import { generateTestData } from "../test-data/test-data";
import { OffersDao } from "../dao/offers-dao";

export const ApiRoute = (config: TConfig) => {
  const suppliersDao = SuppliersDao();
  const offersDao = OffersDao();
  const suppliersService = SuppliersService(suppliersDao);
  const auctionService = AuctionsService(
    AuctionsDao(suppliersDao, offersDao),
    suppliersDao,
    offersDao,
    SendGridMailingService(config.email.sendGridApiKey)
  );

  // generateTestData(suppliersService, auctionService);

  const router = Router();

  const requireLogin = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.sendStatus(403);
    }
  };

  router.get('/suppliers', requireLogin, (req: Request, res: Response) => {
    res.json(suppliersService.getAll(req.user));
  });

  router.post('/suppliers', requireLogin, (req: Request, res: Response) => {
    res.json(suppliersService.addSupplier(req.user, req.body));
  });

  router.get('/auctions/:id?', requireLogin, (req: Request, res: Response) => {
    res.json(auctionService.getAll());
  });

  router.post('/auctions', requireLogin, (req: Request, res: Response) => {
    const auctionId = auctionService.addAuction(req.body);
    res.status(201).json(auctionId);
  });

  router.get('/components/:id?', requireLogin, (req: Request, res: Response) => {
    const { id } = req.params;
    if (id) {
      res.json(auctionService.getComponentById(id));
    } else {
      res.json(auctionService.getComponents());
    }
  });

  router.get('/offer', (req: Request, res: Response) => {
    const [auctionId] = req.query.token.split('_');
    res.json(auctionService.getById(auctionId));
  });

  router.post('/offer', (req: Request, res: Response) => {
    const { token, offerDetails } = req.body; // TODO save supplier info and company info if they exists
    // TODO extract supplier id from token
    const [auctionId, supplierId] = token.split('_');
    auctionService.addOffer(supplierId, offerDetails);
    res.sendStatus(201);
  });

  router.post('/order', (req: Request, res: Response) => {
    const { auctionId, componentId, offerId } = req.body;
    auctionService.addPurchaseOrder({
      auctionId,
      details: [{
        componentId,
        offerId,
        quantity: 10
      }]
    });
    res.sendStatus(201);
  });

  router.get('/user-details', (req: any, res: Response) => {
    if (!req.isAuthenticated()) {
      res.json({ isLoggedIn: req.isAuthenticated() });
    } else {
      const { displayName, email, profileImage } = req.user;
      res.json({ name: displayName, email, image: profileImage, isLoggedIn: req.isAuthenticated() });
    }
  });

  router.get('*', (req: Request, res: Response) => {
    res.sendStatus(404);
  });

  return router;
};