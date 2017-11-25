import * as mysql from 'mysql';
import { DBConfig } from '../../config/config';
import { MysqlError, PoolConnection } from 'mysql';

export interface Database {
  query(query: string, values?: any[]): Promise<any>;
}

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

  await query(`USE ${config.database}`).then(() => {
    return query(`
      CREATE TABLE IF NOT EXISTS users (
        id            VARCHAR(50) NOT NULL,
        email         VARCHAR(100) NOT NULL,
        password      CHAR(60) CHARACTER SET latin1 COLLATE latin1_bin,
        google_id     VARCHAR(50),
        display_name  VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
        profile_image TEXT,
        PRIMARY KEY (id)
      );
    `);
  });

  return { query };
};
