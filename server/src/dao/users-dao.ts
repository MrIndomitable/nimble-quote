import { TUser } from '../services/users-service';
import { Guid } from '../types/common';
export interface IUsersDao {
  findById(id: Guid): Promise<TUser>;
  findByGoogleId(googleId: string): Promise<TUser>;
  findByEmail(email: string): Promise<TUser>;
  saveUser(user: TUser): Promise<void>;
}

export const UsersDao = (): IUsersDao => {
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

  const saveUser = (user: TUser): Promise<void> => {
    _users[user.id] = user;
    if (user.google) {
      _googleUsers[user.google.id] = user.id;
    }
    if (user.local) {
      _localUsers[user.local.email] = user.id;
    }
    return Promise.resolve();
  };

  return {
    findById,
    findByGoogleId,
    findByEmail,
    saveUser
  };
};
