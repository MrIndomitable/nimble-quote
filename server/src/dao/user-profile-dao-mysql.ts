import { Database } from './config/configure-mysql';
import { IUserProfileDao } from './user-profile-dao';
import { TUserProfile } from '../services/user-profile-service';
import { Guid } from '../types/common';

const insertUserProfile = `
  INSERT INTO user_profile (id, user_id, company_name, contact_name, address, city, state, country, zip, phone)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
`;

const selectUserProfileByUserId =  `
  SELECT id, user_id, company_name, contact_name, address, city, state, country, zip, phone
  FROM user_profile
  WHERE user_id = ?;
`;

export const UserProfileDaoMysql = (db: Database): IUserProfileDao => {
  const addProfile = async(profile: TUserProfile): Promise<void> => {
    await db.query(insertUserProfile, [
      profile.id,
      profile.userId,
      profile.companyName,
      profile.contactName,
      profile.address,
      profile.city,
      profile.state,
      profile.country,
      profile.zip,
      profile.phone
    ]);
  };

  const mapToUserProfile = (rows: any[]): TUserProfile[] => {
    return rows.map(row => {
      const { id, user_id, company_name, contact_name, address, city, state, country, zip, phone } = row;
      return {
        id,
        userId: user_id,
        companyName: company_name,
        contactMame: contact_name,
        address,
        city,
        state,
        country,
        zip,
        phone
      }
    });
  };

  const getProfileByUserId = (userId: Guid): Promise<TUserProfile> => {
    return db.query(selectUserProfileByUserId, [userId]).then(mapToUserProfile).then(profiles => profiles.pop());
  };

  return {
    addProfile,
    getProfileByUserId
  };
};
