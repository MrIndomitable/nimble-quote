import * as mysql from 'mysql';
import { DBConfig } from '../../config/config';
import { MysqlError, PoolConnection } from 'mysql';

export interface Database {
  query(query: string, values?: any[]): Promise<any>;
}

const usersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id            VARCHAR(50) NOT NULL,
    email         VARCHAR(100) NOT NULL,
    password      CHAR(60) CHARACTER SET latin1 COLLATE latin1_bin,
    google_id     VARCHAR(50),
    display_name  VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
    profile_image TEXT,
    PRIMARY KEY (id)
  );
`;

const suppliersTable = `
  CREATE TABLE IF NOT EXISTS suppliers (
    id            VARCHAR(50) NOT NULL,
    user_id       VARCHAR(50) NOT NULL,
    email         VARCHAR(100) NOT NULL,
    company       VARCHAR(100), 
    contact_name  VARCHAR(50), 
    phone         VARCHAR(25), 
    address       TEXT, 
    state         VARCHAR(15), 
    country       VARCHAR(15), 
    zip           VARCHAR(15),
    PRIMARY KEY (id),
    UNIQUE KEY email_per_user (user_id, email)
  );
`;

const auctionsTable = `
  CREATE TABLE IF NOT EXISTS auctions (
    id            VARCHAR(50) NOT NULL,
    user_id       VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
  );
`;

const componentsTable = `
  CREATE TABLE IF NOT EXISTS components (
    id          VARCHAR(50)   NOT NULL,
    auction_id  VARCHAR(50)   NOT NULL,
    part_number VARCHAR(50)   NOT NULL,
    manufacture VARCHAR(50)   NOT NULL,
    quantity    MEDIUMINT     NOT NULL,
    price       DECIMAL(15,2) NOT NULL,
    supply_date BIGINT        NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (auction_id) REFERENCES auctions(id)
  );
`;

const suppliersInAuctionTable = `
  CREATE TABLE IF NOT EXISTS suppliers_in_auction (
    auction_id  VARCHAR(50) NOT NULL,
    supplier_id VARCHAR(50) NOT NULL,
    FOREIGN KEY (auction_id) REFERENCES auctions(id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
  );
`;

const offersTable = `
  CREATE TABLE IF NOT EXISTS offers (
    id            VARCHAR(50)   NOT NULL,
    component_id  VARCHAR(50)   NOT NULL,
    supplier_id   VARCHAR(50)   NOT NULL,
    quantity      MEDIUMINT     NOT NULL,
    price         DECIMAL(15,2) NOT NULL,
    supply_date   BIGINT        NOT NULL,
    part_date     BIGINT        NOT NULL,
    PRIMARY KEY (id, component_id, supplier_id)
  );
`;

const ordersTable = `
  CREATE TABLE IF NOT EXISTS orders (
    id          VARCHAR(50)   NOT NULL,
    auction_id  VARCHAR(50)   NOT NULL,
    status      TINYINT,
    PRIMARY KEY (id),
    FOREIGN KEY (auction_id) REFERENCES auctions(id)
  );
`;

const orderDetailsTable = `
  CREATE TABLE IF NOT EXISTS order_details (
    order_id    VARCHAR(50)   NOT NULL,
    offer_id    VARCHAR(50)   NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (offer_id) REFERENCES offers(id)
  );
`;

const userProfileTable =  `
  CREATE TABLE IF NOT EXISTS user_profile (
    id            VARCHAR(50)   NOT NULL,
    user_id       VARCHAR(50)   NOT NULL,
    company_name  VARCHAR(100), 
    contact_name  VARCHAR(50),
    address       TEXT,
    city          VARCHAR(50),
    state         VARCHAR(15),
    country       VARCHAR(15),
    zip           VARCHAR(15),
    phone         VARCHAR(25),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`;

export const configureMysql = async (config: DBConfig): Promise<Database> => {
  const pool = mysql.createPool(config);
  const query = (query: string, values?: any[]): Promise<any> => {
    return new Promise((resolve, reject) => {
      const queryCallback = (connection: PoolConnection) => (err: MysqlError, result: any) => {
        if (err) {
          reject(err);
        } else {
          connection.release();
          resolve(result);
        }
      };

      pool.getConnection((err: MysqlError, connection: PoolConnection) => {
        if (err) {
          reject(err);
          return;
        }
        connection.query(query, values, queryCallback(connection));
      });
    });
  };

  await query(`USE ${config.database}`);
  await query(usersTable);
  await query(suppliersTable);
  await query(auctionsTable);
  await query(componentsTable);
  await query(offersTable);
  await query(suppliersInAuctionTable);
  await query(ordersTable);
  await query(orderDetailsTable);
  await query(userProfileTable);

  return { query };
};
