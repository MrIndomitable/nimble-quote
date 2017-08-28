const {Router} = require('express');

module.exports = (passport) => {
  const router = Router();

  router.get(
    '/auth/google',
    passport.authenticate('google', { scope : ['profile', 'email'] })
  );

  router.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      successRedirect : '/profile',
      failureRedirect : '/'
    })
  );

  return router;
};