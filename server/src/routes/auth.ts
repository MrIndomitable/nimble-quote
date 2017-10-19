const { Router } = require('express');
import { Response } from 'express';

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

  router.get('/auth/logout', (req: any, res: Response) => {
    req.logout();
    res.redirect('/');
  });

  router.post('/auth/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/',
      failureRedirect: '/signup'
    })
  );

  router.post('/login',
    passport.authenticate('local-login', {
      successRedirect: '/',
      failureRedirect: '/login'
    })
  );

  return router;
};