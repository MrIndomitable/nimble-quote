import { TConfig } from './config';
import * as passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { IUsersService, TUser } from "../services/users-service";
import { Guid } from "../types/common";

export default (users: IUsersService, config: TConfig) => {
  passport.serializeUser((user: TUser, done: any) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: Guid, done: any) => {
    users.findById(id)
      .then((user: TUser) => done(null, user))
      .catch(done);
  });

  passport.use(new GoogleStrategy(config.googleAuth,
    (token: any, refreshToken: any, profile: any, done: any) => {
      process.nextTick(() => {
        users.findByGoogleId(profile.id)
          .then((user: TUser) => {
            if (user) {
              done(null, user);
            } else {
              const newUser = {
                displayName: profile.displayName,
                email: profile.emails[0].value,
                profileImage: profile.photos[0].value,
                googleId: profile.id,
                token: token
              };

              users.saveGoogleUser(newUser)
                .then((user: TUser) => done(null, user))
                .catch(done);
            }
          });
      });
    }
  ));

  return passport;
};
