import * as mysql from 'mysql';
import { DBConfig } from '../../config/config';

export const createDBIfNotExists = (config: DBConfig) => {
  const { database } = config;
  const connection = mysql.createConnection(config);

  connection.connect();
  connection.query(`USE ${database}`);
  connection.query('CREATE TABLE IF NOT EXISTS users (' +
    'id VARCHAR(50) NOT NULL,' +
    'email VARCHAR(100) NOT NULL,' +
    'password CHAR(60) CHARACTER SET latin1 COLLATE latin1_bin,' +
    'google_id VARCHAR(50),' +
    'display_name VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci,' +
    'profile_image TEXT,' +
    'PRIMARY KEY (id)' +
    ');');
  connection.end();
};
