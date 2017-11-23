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
  },
  db: DBConfig
}

export type DBConfig = {
  host: string;
  user: string;
  password: string;
  database: string;
};

const dbConfig = () => {
  const r = /^mysql:\/\/(\w+):(\w+)@([\w|\.|-]+):3306\/(\w+)$/;
  const [input, user, password, host, database] = r.exec(env.JAWSDB_URL);
  return { user, password, host, database };
};

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
  },
  db: dbConfig()
};

export default config;