import { Request, Response, Router } from 'express';

export const AuthRoute = (passport: any) => {
  const router = Router();

  router.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  router.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/login'
    })
  );

  router.post('/auth/logout', (req: any, res: Response) => {
    req.logout();
    res.redirect('/');
  });

  router.post('/auth/signup',
    passport.authenticate('local-signup'),
    (req: Request, res: Response) => {
      console.log('successful signup', req.user);
      res.sendStatus(200);
    }
  );

  router.post('/auth/login',
    passport.authenticate('local-login'),
    (req: Request, res: Response) => {
      console.log('successful login', req.user);
      res.sendStatus(200);
    }
  );

  return router;
};