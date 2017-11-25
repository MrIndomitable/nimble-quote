import { ISuppliersDao } from './suppliers-dao';
import { Guid } from '../types/common';
import { TSupplier, TSupplierDetails } from '../types/auctions';
import { Database } from './config/configure-mysql';

const insertSupplier = `
  INSERT INTO suppliers (id, user_id, email) 
  VALUES (?, ?, ?);
`;

const updateSupplierDetails = `
  UPDATE suppliers
  SET  
    company = ?, 
    contact_name = ?, 
    phone = ?, 
    address = ?, 
    state = ?, 
    country = ?, 
    zip = ?
  WHERE id = ?
`;

const selectSupplierDetails = `
  SELECT id, email, company, contact_name, phone, address, state, country, zip
  FROM suppliers
  WHERE id = ?;
`;

const selectSupplierById = `
  SELECT id, email 
  FROM suppliers 
  WHERE id = ?;
`;

const selectAllSuppliersByUser = `
  SELECT id, email 
  FROM suppliers 
  WHERE user_id = ?;
`;

export const SuppliersDaoMysql = (db: Database): ISuppliersDao => {
  const addSupplier = async (userId: Guid, supplier: TSupplier): Promise<Guid> => {
    await db.query(insertSupplier, [supplier.id, userId, supplier.email]);
    return supplier.id;
  };
  const addSupplierDetails = async(userId: Guid, supplierDetails: TSupplierDetails): Promise<void> => {
    const { id, company, contactName, phone, address, state, country, zip } = supplierDetails;
    const result = await db.query(updateSupplierDetails, [
      company,
      contactName,
      phone,
      address,
      state,
      country,
      zip,
      id
    ]);
    console.log('SuppliersDaoMysql', 'addSupplierDetails', result);
  };

  const getSupplierDetails = async(supplierId: Guid): Promise<TSupplierDetails> => {
    const result = await db.query(selectSupplierDetails, [supplierId]);
    return result.map((row: any) => {
      return {
        id: row.id,
        email: row.email,
        company: row.company,
        contactName: row.companyName,
        phone: row.phone,
        address: row.address,
        state: row.state,
        country: row.country,
        zip: row.zip
      }
    }).pop();
  };
  const getSupplierById = async(userId: Guid, id: Guid): Promise<TSupplier> => {
    const result = await db.query(selectSupplierById, [id]);
    return result
      .map((row: any) => ({ id: row.id, email: row.email }))
      .pop();
  };
  const getAll = async (userId: Guid): Promise<TSupplier[]> => {
    const result = await db.query(selectAllSuppliersByUser, [userId]);
    return result.map((row: any) => ({ id: row.id, email: row.email }));
  };

  return {
    addSupplier,
    addSupplierDetails,
    getSupplierDetails,
    getSupplierById,
    getAll
  };
};
