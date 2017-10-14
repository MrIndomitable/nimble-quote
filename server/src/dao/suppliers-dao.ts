import { TSupplier } from "../types/auctions";
import { Guid } from "../types/common";

type TDBSupplier = {
  id: Guid;
  email: string;
}

export interface ISuppliersDao {
  addSupplier: (userId: Guid, supplier: TSupplier) => Guid;
  getSupplierById: (userId: Guid, id: Guid) => TSupplier;
  getAll: (userId: Guid) => TSupplier[];
}

export const SuppliersDao = (): ISuppliersDao => {
  const _suppliers: { [supplierId: string]: TDBSupplier } = {};

  const addSupplier = (userId: Guid, supplier: TSupplier) => {
    const { id, email } = supplier;

    // TODO check if email exists
    _suppliers[id] = { id, email };

    return id;
  };

  const getSupplierById = (userId: Guid, id: Guid) => _suppliers[id];

  const getAll = (userId: Guid) => {
    return Object
      .keys(_suppliers)
      .map((id: Guid) => _suppliers[id]);
  };

  return {
    addSupplier,
    getSupplierById,
    getAll
  }
};