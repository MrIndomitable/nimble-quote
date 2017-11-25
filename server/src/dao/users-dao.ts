import { TUser } from '../services/users-service';
import { Guid } from '../types/common';
import { Database } from './config/configure-mysql';

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

export const UsersDao = (db: Database): IUsersDao => {
  const convertToUser = (results: any[]) => {
    if (results.length === 0) {
      throw 'user not found';
    } else {
      const { id, email, password, display_name, profile_image } = results[0];
      return { id, email, local: { email, password }, displayName: display_name, profileImage: profile_image };
    }
  };

  const findById = (id: Guid) => {
    return db.query(selectByIdStatement, [id]).then(convertToUser);
  };

  const findByGoogleId = (googleId: string): Promise<TUser> => {
    return db.query(selectByGoogleIdStatement, [googleId]).then(convertToUser);
  };

  const findByEmail = (email: string): Promise<TUser> => {
    return db.query(selectByEmailStatement, [email]).then(convertToUser);
  };

  const saveUser = (user: TUser): Promise<void> => {
    const values = [
      user.id,
      user.email,
      user.local && user.local.password,
      user.google && user.google.id,
      user.displayName,
      user.profileImage
    ];
    return db.query(insertStatement, values);
  };

  return {
    findById,
    findByGoogleId,
    findByEmail,
    saveUser
  };
};
