const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const configAuth = require('./config').default;

export default (users: any) => {
  passport.serializeUser((user: any, done: any) => {
    done(null, user.google.id);
  });

  passport.deserializeUser((id: string, done: any) => {
    users.findById(id, (err: any, user: any) => {
      done(err, user);
    });
  });

  passport.use(new GoogleStrategy(configAuth.googleAuth,
    (token: any, refreshToken: any, profile: any, done: any) => {
      process.nextTick(() => {
        users.findOne({'google.id': profile.id}, (err: any, user: any) =>{
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

            users.save(newUser, (err: any) => {
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
