import { Guid } from "../types/common";
const uuid = require('uuid').v4;

export interface IUsersService {
  findById(id: Guid): Promise<TUser>;
  findByGoogleId(googleId: string): Promise<TUser>;
  saveGoogleUser(googleUser: TGoogleUser): Promise<TUser>;
}

export type TUser = {
  id: Guid;
  email: string;
  profileImage?: string;
  displayName?: string;
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

  const findById = (id: Guid): Promise<TUser> => {
    return Promise.resolve(_users[id]);
  };

  const findByGoogleId = (googleId: string): Promise<TUser> => {
    const userId = _googleUsers[googleId];
    return Promise.resolve(_users[userId]);
  };

  const saveGoogleUser = (googleUser: TGoogleUser): Promise<TUser> => {
    const id = uuid();
    const { googleId, email, profileImage, displayName } = googleUser;
    const user = { id: id, email, profileImage, displayName };
    _users[id] = user;
    _googleUsers[googleId] = id;
    return Promise.resolve(user);
  };

  return {
    findById,
    findByGoogleId,
    saveGoogleUser
  }
};