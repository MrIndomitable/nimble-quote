import { TSupplier, TSupplierDetails } from '../types/auctions';
import { Guid } from "../types/common";

type TDBSupplier = {
  id: Guid;
  email: string;
  company?: string;
  contactName?: string;
  phone?: string;
  address?: string;
  state?: string;
  country?: string;
  zip?: string;
}

export interface ISuppliersDao {
  addSupplier: (userId: Guid, supplier: TSupplier) => Guid;
  addSupplierDetails(userId: Guid, supplierDetails: TSupplierDetails): Promise<void>;
  getSupplierDetails(supplierId: Guid): Promise<TSupplierDetails>;
  getSupplierById: (userId: Guid, id: Guid) => TSupplier;
  getAll: (userId: Guid) => TSupplier[];
}

export const SuppliersDao = (): ISuppliersDao => {
  const _suppliersByUser: { [userId: string]: Guid[] } = {};
  const _suppliers: { [supplierId: string]: TDBSupplier } = {};

  const addSupplier = (userId: Guid, supplier: TSupplier) => {
    const { id, email } = supplier;

    // TODO check if email exists
    _suppliers[id] = { id, email };

    _suppliersByUser[userId] = _suppliersByUser[userId] || [];
    _suppliersByUser[userId].push(id);

    return id;
  };

  const getSupplierById = (userId: Guid, id: Guid) => _suppliers[id];

  const getAll = (userId: Guid) => {
    return (_suppliersByUser[userId] || []).map(id => _suppliers[id]);
  };

  const addSupplierDetails = (userId: Guid, supplierDetails: TSupplierDetails): Promise<void> => {
    const supplier = _suppliers[supplierDetails.id];
    if (!supplier) {
      console.log(`supplier with id ${supplierDetails.id} doesn't exists`);
    } else {
      const { company, contactName, phone, address, state, country, zip } = supplierDetails;
      _suppliers[supplierDetails.id] = {
        ...supplier,
        company,
        contactName,
        phone,
        address,
        state,
        country,
        zip
      };
    }

    return Promise.resolve();
  };

  const getSupplierDetails = (supplierId: Guid): Promise<TSupplierDetails> => {
    const { id, email, company, contactName, phone, address, state, country, zip } = _suppliers[supplierId];
    return Promise.resolve({
      id,
      email,
      company,
      contactName,
      phone,
      address,
      state,
      country,
      zip
    });
  };

  return {
    addSupplier,
    addSupplierDetails,
    getSupplierDetails,
    getSupplierById,
    getAll
  }
};