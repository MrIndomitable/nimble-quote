import { Guid } from '../types/common';
import { TUserProfile } from "../services/user-profile-service";

export interface IUserProfileDao {
  addProfile(profile: TUserProfile): Promise<void>;
  getProfileByUserId(userId: Guid): Promise<TUserProfile>;
}

type TDBUserProfile = {
  id: Guid;
  userId: Guid;
  companyName?: string;
  contactName?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  phone?: string;
}

export const UserProfileDao = (): IUserProfileDao => {
  const _profiles: { [profileId: string]: TDBUserProfile } = {};
  const _userProfiles: { [userId: string]: Guid } = {};

  const addProfile = (profile: TUserProfile): Promise<void> => {
    _profiles[profile.id] = profile;
    _userProfiles[profile.userId] = profile.id;
    return Promise.resolve();
  };

  const getProfileByUserId = (userId: Guid): Promise<TUserProfile> => {
    const profileId = _userProfiles[userId];
    if (profileId) {
      return Promise.resolve(_profiles[profileId]);
    } else {
      return Promise.reject(`cannot find profile by user id ${userId}`);
    }
  };

  return {
    addProfile,
    getProfileByUserId
  }
};