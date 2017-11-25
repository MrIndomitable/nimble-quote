import { ISuppliersDao } from '../dao/suppliers-dao';
import { Guid } from '../types/common';
import { v4 as uuid } from 'uuid';
import { TSupplierDTO } from '../types/auctions';

export const SuppliersService = (suppliersDao: ISuppliersDao) => {
  return {
    getAll: async (userId: Guid) => {
      const suppliers = await suppliersDao.getAll(userId);
      return { suppliers };
    },
    addSupplier: async (userId: Guid, { email }: TSupplierDTO) => {
      const id = uuid();
      await suppliersDao.addSupplier(userId, { id, email });
      return id;
    }
  };
};