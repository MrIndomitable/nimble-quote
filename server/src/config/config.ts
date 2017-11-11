const env: any = process.env;

export type TConfig = {
  session: {
    secret: string;
  };
  googleAuth: {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
  },
  email: {
    tokenEncryptionKey: string;
    sendGridApiKey: string;
  }
}

const config: TConfig = {
  session: {
    secret: env.SESSION_SECRET
  },
  googleAuth: {
    clientID: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackURL: env.GOOGLE_CALLBACK_URL
  },
  email: {
    tokenEncryptionKey: env.EMAIL_TOKEN_ENCRYPTION_KEY,
    sendGridApiKey: env.SENDGRID_API_KEY
  }
};

export default config;