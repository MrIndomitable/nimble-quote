import { TConfig } from '../../../src/config/config';

export const testConfig: TConfig = {
  session: {
    secret: 'secret'
  },
  googleAuth: {
    clientID: 'gcid',
    clientSecret: 'gcs',
    callbackURL: 'gcurl'
  }
};
