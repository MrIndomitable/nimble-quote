const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const configAuth = require('./config');

module.exports = (users) => {
  passport.serializeUser((user, done) => {
    done(null, user.google.id);
  });

  passport.deserializeUser((id, done) => {
    users.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(new GoogleStrategy(configAuth.googleAuth,
    (token, refreshToken, profile, done) => {
      process.nextTick(() => {
        users.findOne({'google.id': profile.id}, (err, user) =>{
          if (err)
            return done(err);

          if (user) {
            // if a user is found, log them in
            return done(null, user);
          } else {
            const newUser = {
              google: {
                id: profile.id,
                token: token,
                name: profile.displayName,
                email: profile.emails[0].value,
                image: profile.photos[0].value
              }
            };

            users.save(newUser, err => {
              if (err)
                throw err;
              return done(null, newUser);
            });
          }
        });
      });
    }
  ));

  return passport;
};
