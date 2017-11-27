import { Guid } from '../types/common';
import { TComponent } from '../types/auctions';
import { IOffersDao } from './offers-dao';
import { IOrdersDao } from './orders-dao';

type TDBComponent = {
  id: Guid;
  partNumber: string;
  manufacture: string;
  targetPrice: number;
  quantity: number;
  supplyDate: number;
  auctionId: Guid;
};

export interface IComponentsDao {
  addComponentsOf(auctionId: Guid, components: TComponent[]): Promise<void>;
  getComponents(): Promise<TComponent[]>;
  getComponentById(id: Guid): Promise<TComponent>;
  getComponentsByAuctionId(auctionId: Guid): Promise<TComponent[]>;
}

export const ComponentsDao = (offersDao: IOffersDao, ordersDao: IOrdersDao): IComponentsDao => {
  const _components: { [componentId: string]: TDBComponent } = {};
  const _componentsByAuction: { [auctionId: string]: Guid[] } = {};

  const getComponents = (): Promise<TComponent[]> => {
    return Promise.all(Object.keys(_components).map(getComponentById));
  };

  const getComponentById = async(id: Guid): Promise<TComponent> => {
    const { partNumber, manufacture, targetPrice, quantity, supplyDate, auctionId } = _components[id];
    const purchaseOrder = ordersDao.getOrderByComponentId(id);

    return Promise.resolve({
      id,
      partNumber,
      manufacture,
      targetPrice,
      quantity,
      supplyDate,
      auctionId,
      offers: offersDao.getOffersByComponentId(id),
      purchaseOrder
    });
  };

  const addComponentsOf = async(auctionId: Guid, components: TComponent[]): Promise<void> => {
    components.forEach(comp => {
      _components[comp.id] = comp;
      _componentsByAuction[auctionId] = _componentsByAuction[auctionId] || [];
      _componentsByAuction[auctionId].push(comp.id);
    });
  };

  const getComponentsByAuctionId = (auctionId: Guid): Promise<TComponent[]> => {
    return Promise.all(_componentsByAuction[auctionId].map(getComponentById));
  };

  return {
    addComponentsOf,
    getComponents,
    getComponentById,
    getComponentsByAuctionId
  };
};
