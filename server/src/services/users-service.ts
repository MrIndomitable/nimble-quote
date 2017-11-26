import { Guid } from '../types/common';
const uuid = require('uuid').v4;
import * as bcrypt from 'bcrypt-nodejs';
import { IUsersDao } from '../dao/users-dao';

export interface IUsersService {
  findById(id: Guid): Promise<TUser>;
  findByGoogleId(googleId: string): Promise<TUser>;
  findByEmail(email: string): Promise<TUser>;
  findByEmailAndPassword(email: string, password: string): Promise<TUser>;
  saveGoogleUser(googleUser: TGoogleUser): Promise<TUser>;
  saveLocalUser(email: string, password: string): Promise<TUser>;
}

export type TUser = {
  id: Guid;
  email: string;
  profileImage?: string;
  displayName?: string;
  local?: {
    email: string;
    password: string;
  };
  google?: {
    id: string;
  }
}

type TGoogleUser = {
  googleId: string;
  email: string,
  displayName?: string;
  profileImage?: string;
}

const handleUserNotFound = (e: any): any => {
  if (e === 'user not found') return null;
  else throw e;
};

export const UsersService = (usersDao: IUsersDao): IUsersService => {
  const findByEmail = (email: string) => usersDao.findByEmail(email).catch(handleUserNotFound);
  const findByGoogleId = (googleId: string) => usersDao.findByGoogleId(googleId).catch(handleUserNotFound);
  const findById = (id: Guid) => usersDao.findById(id).catch(handleUserNotFound);

  const findByEmailAndPassword = (email: string, password: string): Promise<TUser> => {
    return findByEmail(email).then(user => {
      if (!user) return null;
      const isValidPassword = user.local && user.local.password && bcrypt.compareSync(password, user.local.password);
      return isValidPassword ? user : null;
    });
  };

  const saveGoogleUser = (googleUser: TGoogleUser): Promise<TUser> => {
    const id = uuid();
    const { googleId, email, profileImage, displayName } = googleUser;
    const user = { id: id, email, profileImage, displayName, google: { id: googleId } };

    return usersDao.saveUser(user).then(() => user);
  };

  const saveLocalUser = (email: string, password: string): Promise<TUser> => {
    const user: TUser = {
      id: uuid(),
      email,
      local: {
        email,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(8))
      }
    };

    return usersDao.saveUser(user).then(() => user);
  };

  return {
    findById,
    findByGoogleId,
    findByEmail,
    findByEmailAndPassword,
    saveGoogleUser,
    saveLocalUser
  };
};