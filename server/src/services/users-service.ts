import { Guid } from "../types/common";
const uuid = require('uuid').v4;
import * as bcrypt from 'bcrypt-nodejs';

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
  }
}

type TGoogleUser = {
  googleId: string;
  email: string,
  displayName?: string;
  profileImage?: string;
}

export const UsersService = (): IUsersService => {
  const _users: { [id: string]: TUser; } = {};
  const _googleUsers: { [googleId: string]: Guid } = {};
  const _localUsers: { [email: string]: Guid } = {};

  const findById = (id: Guid): Promise<TUser> => {
    const user = _users[id];
    if (user) {
      return Promise.resolve(user);
    } else {
      return Promise.reject(`cannot find user with id ${id}`);
    }
  };

  const findByGoogleId = (googleId: string): Promise<TUser> => {
    const userId = _googleUsers[googleId];
    return Promise.resolve(_users[userId]);
  };

  const findByEmail = (email: string): Promise<TUser> => {
    const userId = _localUsers[email];
    return Promise.resolve(_users[userId]);
  };

  const findByEmailAndPassword = (email: string, password: string): Promise<TUser> => {
    const userId = _localUsers[email];
    if (!userId) {
      return Promise.resolve(null);
    }

    const user = _users[userId];
    const isValidPassword = user.local && user.local.password && bcrypt.compareSync(password, user.local.password);

    return Promise.resolve(isValidPassword ? user : null);
  };

  const saveGoogleUser = (googleUser: TGoogleUser): Promise<TUser> => {
    const id = uuid();
    const { googleId, email, profileImage, displayName } = googleUser;
    const user = { id: id, email, profileImage, displayName };
    _users[id] = user;
    _googleUsers[googleId] = id;
    return Promise.resolve(user);
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

    _users[user.id] = user;
    _localUsers[email] = user.id;

    return Promise.resolve(user);
  };

  return {
    findById,
    findByGoogleId,
    findByEmail,
    findByEmailAndPassword,
    saveGoogleUser,
    saveLocalUser
  }
};