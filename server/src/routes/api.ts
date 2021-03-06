import { Response, Request, NextFunction, Router } from 'express';
import { AuctionsService } from '../services/auctions-service';
import { SendGridMailingService } from '../mailing-service/send-grid-mailing-service';
import { TConfig } from '../config/config';
import { SuppliersService } from '../services/suppliers-service';
import { OrdersService } from '../services/orders-service';
import { IUsersService } from '../services/users-service';
import { UserProfileService } from '../services/user-profile-service';
import { verify } from 'jsonwebtoken';
import { SuppliersDaoMysql } from '../dao/supplier-dao-mysql';
import { Database } from '../dao/config/configure-mysql';
import { AuctionsDaoMysql } from '../dao/auctions-dao-mysql';
import { OffersDaoMysql } from '../dao/offers-dao-mysql';
import { OrdersDaoMysql } from '../dao/orders-dao-mysql';
import { UserProfileDaoMysql } from '../dao/user-profile-dao-mysql';

export const ApiRoute = (config: TConfig, usersService: IUsersService, db: Database) => {
  const suppliersDao = SuppliersDaoMysql(db);
  const offersDao = OffersDaoMysql(db);
  const ordersDao = OrdersDaoMysql(db);

  const suppliersService = SuppliersService(suppliersDao);
  const auctionsDao = AuctionsDaoMysql(db, suppliersDao, offersDao, ordersDao);
  const auctionService = AuctionsService(
    auctionsDao,
    suppliersDao,
    offersDao,
    usersService,
    SendGridMailingService(config.email.sendGridApiKey)
  );
  const userProfileDao = UserProfileDaoMysql(db);
  const userProfileService = UserProfileService(userProfileDao);
  const ordersService = OrdersService(ordersDao, offersDao, userProfileDao, auctionsDao, suppliersDao);

  const router = Router();

  const requireLogin = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.sendStatus(403);
    }
  };

  router.get('/suppliers', requireLogin, (req: Request, res: Response) => {
    suppliersService.getAll(req.user.id).then(suppliers => res.json(suppliers));
  });

  router.post('/suppliers', requireLogin, (req: Request, res: Response) => {
    suppliersService.addSupplier(req.user.id, req.body).then(supplierId => res.json(supplierId));
  });

  router.get('/auctions/:id?', requireLogin, (req: Request, res: Response) => {
    auctionService.getAll(req.user.id).then(auctions => res.json(auctions));
  });

  router.post('/auctions', requireLogin, (req: Request, res: Response) => {
    auctionService.addAuction(req.user.id, req.body).then(auctionId => {
      res.status(201).json(auctionId);
    });
  });

  router.get('/components/:id?', requireLogin, (req: Request, res: Response) => {
    const { id } = req.params;
    if (id) {
      auctionService.getComponentById(id).then(components => res.json(components));
    } else {
      auctionService.getComponents().then(components => res.json(components));
    }
  });

  router.get('/offer', (req: Request, res: Response) => {
    const [auctionId] = req.query.token.split('_');
    auctionService.getById(auctionId).then(auction => {
      res.json(auction);
    });
  });

  router.post('/offer', (req: Request, res: Response) => {
    const { token, offerDetails } = req.body;
    // TODO extract supplier id from token
    const [auctionId, supplierId] = token.split('_');
    auctionService.addOffer(supplierId, offerDetails)
      .then(() => res.sendStatus(201));
  });

  router.get('/order/:purchaseToken', (req: Request, res: Response) => {
    const { orderId }: any = verify(req.params.purchaseToken, config.email.tokenEncryptionKey);
    ordersService.getOrderById(orderId)
      .then((order: any) => res.json(order))
      .catch((e: any) => {
        console.log('error getting order by id', req.params.orderId, e);
        res.sendStatus(400);
      });
  });

  router.post('/acknowledge', (req: Request, res: Response) => {
    const { orderId }: any = verify(req.body.token, config.email.tokenEncryptionKey);
    ordersService.acknowledgeOrder(orderId)
      .then(() => res.sendStatus(201))
      .catch(e => {
        console.log('error during acknowledge purchase flow', e);
        return res.sendStatus(500);
      });
  });

  router.post('/order', requireLogin, async(req: Request, res: Response) => {
    const { auctionId, componentId, offerId, company, supplier } = req.body; // TODO save supplier info and company info if they exists

    const order = {
      auctionId,
      details: [{
        componentId,
        offerId,
        quantity: 10
      }]
    };

    const { supplierId } = await offersDao.getOfferById(offerId);

    Promise.all([
      suppliersDao.addSupplierDetails(req.user.id, { ...supplier, id: supplierId }), //TODO suppliersService should be called here instead of suppliersDao
      userProfileService.addProfile(req.user.id, company),
      auctionService.addPurchaseOrder(req.user.id, order)
    ]).then(() => res.sendStatus(201))
      .catch((e: any) => {
        console.log('error adding new order', JSON.stringify(req.body, null, 2), e);
        res.sendStatus(500);
      });
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