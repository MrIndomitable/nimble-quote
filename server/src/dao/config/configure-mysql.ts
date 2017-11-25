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

export const configureMysql = async(config: DBConfig): Promise<Database> => {
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

  await query(`USE ${config.database}`).then(() => Promise.all([
    query(usersTable),
    query(suppliersTable)
  ]));

  return { query };
};
