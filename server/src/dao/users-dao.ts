import { TUser } from '../services/users-service';
import { Guid } from '../types/common';
import * as mysql from 'mysql';
import { DBConfig } from '../config/config';

export interface IUsersDao {
  findById(id: Guid): Promise<TUser>;
  findByGoogleId(googleId: string): Promise<TUser>;
  findByEmail(email: string): Promise<TUser>;
  saveUser(user: TUser): Promise<void>;
}

const selectByIdStatement = `
  SELECT id, email, password, display_name, profile_image
  FROM users
  WHERE id = ?;
`;
const selectByEmailStatement = `
  SELECT id, email, password, display_name, profile_image
  FROM users
  WHERE email = ?;
`;
const selectByGoogleIdStatement = `
  SELECT id, email, password, display_name, profile_image
  FROM users
  WHERE google_id = ?;
`;
const insertStatement = `
  INSERT INTO users (id, email, password, google_id, display_name, profile_image)
  VALUES (?, ?, ?, ?, ?, ?);
`;

export const UsersDao = (config: DBConfig): IUsersDao => {
  const connection = mysql.createConnection(config);

  const findById = (id: Guid): Promise<TUser> => {
    return new Promise((resolve, reject) => {
      connection.query(
        selectByIdStatement,
        [id],
        toUser(resolve, reject)
      );
    });
  };

  const findByGoogleId = (googleId: string): Promise<TUser> => {
    return new Promise((resolve, reject) => {
      connection.query(
        selectByGoogleIdStatement,
        [googleId],
        toUser(resolve, reject)
      );
    });
  };

  const toUser = (resolve: any, reject: any) => (err: any, results: any[]) => {
    if (err) reject(err);
    else {
      if (results.length === 0) {
        reject('user not found');
      } else {
        const { id, email, password, display_name, profile_image } = results[0];
        const user = { id, email, local: { email, password }, displayName: display_name, profileImage: profile_image };
        resolve(user);
      }
    }
  };

  const findByEmail = (email: string): Promise<TUser> => {
    return new Promise((resolve, reject) => {
      connection.query(
        selectByEmailStatement,
        [email],
        toUser(resolve, reject)
      );
    });
  };

  const saveUser = (user: TUser): Promise<void> => {
    return new Promise((resolve, reject) => {
      connection.query(
        insertStatement,
        [
          user.id,
          user.email,
          user.local && user.local.password,
          user.google && user.google.id,
          user.displayName,
          user.profileImage
        ],
        (err: any) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  };

  return {
    findById,
    findByGoogleId,
    findByEmail,
    saveUser
  };
};
