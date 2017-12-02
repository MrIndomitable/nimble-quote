import { Database } from './config/configure-mysql';
import { TOffer } from '../types/auctions';
import { Guid } from '../types/common';
import { IOffersDao } from './offers-dao';

const insertOffer = (n: number) => {
  const values = Array(n).fill('(?, ?, ?, ?, ?, ?, ?)').join(',');
  return `
    INSERT INTO offers (id, component_id, supplier_id, quantity, price, supply_date, part_date)
    VALUES ${values};
  `;
};

const selectOffersById = `
  SELECT id, component_id, supplier_id, quantity, price, supply_date, part_date
  FROM offers
  WHERE id = ?;
`;

const selectOffersByComponentId = `
  SELECT id, component_id, supplier_id, quantity, price, supply_date, part_date
  FROM offers
  WHERE component_id = ?;
`;

const selectSupplierIdsByOfferIds = `
  SELECT supplier_id
  FROM offers
  WHERE id IN (?);
`;

export const OffersDaoMysql = (db: Database): IOffersDao => {

  const mapToOffer = (rows: any[]): TOffer[] => rows.map(row => ({
    id: row.id,
    componentId: row.component_id,
    supplierId: row.supplier_id,
    partDate: row.part_date,
    supplyDate: row.supply_date,
    quantity: row.quantity,
    price: row.price
  }));

  const mapToSupplierIds = (rows: any[]): Guid[] => rows.map(row => row.supplier_id);

  const addOffer = (supplierId: Guid, offers: TOffer[]): Promise<any> => {
    const values = offers.map(offer => [
      offer.id,
      offer.componentId,
      offer.supplierId,
      offer.quantity,
      offer.price,
      offer.supplyDate,
      offer.partDate
    ]);
    return db.query(insertOffer(offers.length), [].concat(...values));
  };

  const getOffersByComponentId = (componentId: Guid): Promise<TOffer[]> => {
    return db.query(selectOffersByComponentId, [componentId]).then(mapToOffer);
  };

  const getSuppliersByOffers = (offerIds: Guid[]): Promise<Guid[]> => {
    return db.query(selectSupplierIdsByOfferIds, [offerIds.join(',')]).then(mapToSupplierIds);
  };

  const getOfferById = (offerId: Guid): Promise<TOffer> => {
    return db.query(selectOffersById, [offerId]).then(mapToOffer).then(offers => offers.pop());
  };

  return {
    addOffer,
    getOffersByComponentId,
    getSuppliersByOffers,
    getOfferById
  };
};
