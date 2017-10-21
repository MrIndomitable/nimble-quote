import { AuctionsService } from './auctions-service';
import { TComponent } from '../types/auctions';
import { IAuctionsDao } from '../dao/auctions-dao';
import { Guid } from '../types/common';
import { ComponentStatus } from '../types/response';
const chance = require('chance').Chance();

const auctionsDaoDriver = () => {
  const addAuction = jest.fn();
  const addOffer = jest.fn();
  const addPurchaseOrder = jest.fn();
  const getAuctions = jest.fn();
  const getComponents = jest.fn();
  const getAuctionById = jest.fn();

  const auctionsDao: IAuctionsDao = {
    addAuction,
    addOffer,
    addPurchaseOrder,
    getAuctionById,
    getAuctions,
    getComponents,
    getComponentById: (id: Guid) => null
  };

  return {
    api: () => auctionsDao,
    expectComponents: (components: TComponent[]) => getComponents.mockReturnValue(components)
  }
};

type TComponentForTest = {
  id?: Guid;
  partNumber?: string;
  manufacture?: string;
  targetPrice?: number;
  quantity?: number;
  supplyDate?: number;
  offers?: any[];
  auctionId?: Guid;
};

const aComponent = ({ id, partNumber, manufacture, targetPrice, quantity, supplyDate, offers, auctionId }: TComponentForTest = {}): TComponent => {
  const defaults = {
    id: chance.guid(),
    partNumber: chance.word(),
    manufacture: chance.word(),
    targetPrice: chance.integer({ min: 1, max: 1000 }),
    quantity: chance.integer({ min: 1, max: 1000 }),
    supplyDate: chance.date(),
    offers: [] as any[],
    auctionId: chance.guid()
  };

  return ({
    ...defaults,
    id,
    partNumber,
    manufacture,
    targetPrice,
    quantity,
    supplyDate,
    offers,
    auctionId,
    purchaseOrder: null
  });
};

describe('auctions-service', () => {
  describe('get components', () => {
    it('should return component with pending status', () => {
      const daoDriver = auctionsDaoDriver();
      const auctionsService = AuctionsService(daoDriver.api(), null, null, null, null);

      daoDriver.expectComponents([aComponent()]);

      expect(auctionsService.getComponents()).toEqual({
        components: [expect.objectContaining({
          status: ComponentStatus.PENDING,
          offersCount: 0
        })]
      });
    });

    it('should return component with has offers status', () => {
      const mock = auctionsDaoDriver();
      const auctionsService = AuctionsService(mock.api(), null, null, null, null);

      mock.expectComponents([aComponent({ offers: [{}] })]);

      expect(auctionsService.getComponents()).toEqual({
        components: [expect.objectContaining({
          status: ComponentStatus.HAS_OFFERS,
          offersCount: 1
        })]
      });
    });
  });
});