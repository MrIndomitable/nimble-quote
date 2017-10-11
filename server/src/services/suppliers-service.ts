import { ISuppliersDao } from "../dao/suppliers-dao";
import { Guid } from "../types/common";
import { v4 as uuid } from 'uuid';
import { TSupplierDTO } from "../types/auctions";

export const SuppliersService = (suppliersDao: ISuppliersDao) => {
  return {
    getAll: (userId: Guid) => ({
      suppliers: suppliersDao.getAll(userId)
    }),
    addSupplier: (userId: Guid, { email }: TSupplierDTO) => {
      suppliersDao.addSupplier(userId, { id: uuid(), email });
    }
  }
};