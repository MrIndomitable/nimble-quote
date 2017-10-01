import { Response, Request, Router } from 'express';
import { AuctionsService } from '../services/auctions-service';
import { anAuction, anOffer, aSupplier, aPurchaseOrder, aPurchaseOrderDetails } from '../test-data/test-auction';
import { aComponent } from '../test-data/test-auction-details';
import { AuctionsDao } from '../dao/auctions-dao';
import { SendGridMailingService } from '../mailing-service/send-grid-mailing-service';
import { TConfig } from '../config/config';

export const ApiRoute = (config: TConfig) => {
  const auctionService = AuctionsService(AuctionsDao(), SendGridMailingService(config.email.sendGridApiKey));

  const supplier = aSupplier();
  auctionService.addAuction(anAuction([
    aComponent(),
    aComponent()
  ], [
    aSupplier(),
    supplier,
    aSupplier(),
    aSupplier()
  ]));
  auctionService.addAuction(anAuction([
    aComponent(),
    aComponent()
  ], [
    aSupplier()
  ]));

  const [auction] = auctionService.getAll().auctions;
  const [component1, component2] = auction.bom.components;

  const offer1 = anOffer(component1.id);
  const offer2 = anOffer(component2.id);
  auctionService.addOffer(supplier.id, { components: [offer1, offer2] });

  const order = aPurchaseOrder(auction.id, [
    aPurchaseOrderDetails(component1.id, offer1.id)
  ]);

  auctionService.addPurchaseOrder(order);

  const router = Router();

  router.get('/auctions/:id?', (req: Request, res: Response) => {
    res.json(auctionService.getAll());
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

  router.post('/offer', (req: Request, res: Response) => {
    const { token, offerDetails } = req.body;
    // TODO extract supplier id from token
    auctionService.addOffer(token, offerDetails);
    res.sendStatus(201);
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