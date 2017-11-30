import { IComponentsDao } from './components-dao';
import { Guid } from '../types/common';
import { TComponent } from '../types/auctions';
import { Database } from './config/configure-mysql';
import { IOrdersDao } from './orders-dao';
import { IOffersDao } from './offers-dao';

const insertComponent = (n: number) => {
  const values = Array(n).fill('(?, ?, ?, ?, ?, ?, ?)').join(',');
  return `
    INSERT INTO components (id, auction_id, part_number, manufacture, quantity, price, supply_date) 
    VALUES ${values};
  `;
};

const selectComponentsByAuctionId = `
  SELECT id, auction_id, part_number, manufacture, quantity, price, supply_date
  FROM components
  WHERE auction_id = ?;
`;

const selectComponentById = `
  SELECT id, auction_id, part_number, manufacture, quantity, price, supply_date
  FROM components
  WHERE id = ?;
`;

// FIXME should at least query only components of current user
const selectAllComponents = `
  SELECT id, auction_id, part_number, manufacture, quantity, price, supply_date
  FROM components;
`;

export const ComponentDaoMysql = (db: Database, offersDao: IOffersDao, ordersDao: IOrdersDao): IComponentsDao => {
  const mapToComponents = (rows: any[]): TComponent[] => rows.map(toComponent);

  const toComponent = (row: any) => ({
    id: row.id,
    partNumber: row.part_number,
    manufacture: row.manufacture,
    targetPrice: row.price,
    quantity: row.quantity,
    supplyDate: row.supply_date,
    auctionId: row.auction_id
  });

  const addComponentsOf = (auctionId: Guid, components: TComponent[]): Promise<void> => {
    const values = components.map(component => [
      component.id,
      auctionId,
      component.partNumber,
      component.manufacture,
      component.quantity,
      component.targetPrice,
      component.supplyDate
    ]);
    return db.query(insertComponent(components.length), [].concat(...values));
  };

  const getComponents = (): Promise<TComponent[]> => {
    return db.query(selectAllComponents).then(mapToComponents);
  };

  const getComponentById = (id: Guid): Promise<TComponent> => {
    return db.query(selectComponentById, [id]).then(mapToComponents).then(components => {
      const component = components.pop();
      const purchaseOrder = ordersDao.getOrderByComponentId(id);
      const offers = offersDao.getOffersByComponentId(id);
      return {
        ...component,
        offers,
        purchaseOrder
      };
    });
  };

  const getComponentsByAuctionId = (auctionId: Guid): Promise<TComponent[]> => {
    return db.query(selectComponentsByAuctionId, [auctionId]).then(mapToComponents);
  };

  return {
    addComponentsOf,
    getComponents,
    getComponentById,
    getComponentsByAuctionId
  };
};