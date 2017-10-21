import { Guid } from "../types/common";
import { IUserProfileDao } from "../dao/user-profile-dao";
const uuid = require('uuid').v4;

interface IUserProfileService {
  addProfile(userId: Guid, profile: TUserProfile): Promise<void>;
}

export type TUserProfileDTO = {
  name?: string;
  contactName?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  phone?: string;
}

export type TUserProfile = TUserProfileDTO & {
  id: Guid;
  userId: Guid;
  companyName?: string;
}

export const UserProfileService = (userProfileDao: IUserProfileDao): IUserProfileService => {
  const addProfile = (userId: Guid, profileDTO: TUserProfileDTO): Promise<void> => {
    const profile = Object.assign({}, profileDTO, { userId, id: uuid(), companyName: profileDTO.name });
    return userProfileDao.addProfile(profile);
  };

  return {
    addProfile
  }
};