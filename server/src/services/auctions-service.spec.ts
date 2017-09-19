import { AuctionsService } from './auctions-service';
import { ComponentStatus, TComponent } from '../types/auctions';
import { IAuctionsDao } from '../dao/auctions-dao';
import { Guid } from '../types/common';
const chance = require('chance').Chance();

const auctionsDaoDriver = () => {
  const addAuction = jest.fn();
  const getAuctions = jest.fn();
  const getComponents = jest.fn();

  const auctionsDao: IAuctionsDao = {
    addAuction,
    getAuctions,
    getComponents
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
};

const aComponent = ({ id, partNumber, manufacture, targetPrice, quantity, supplyDate, offers }: TComponentForTest = {}): TComponent => {
  const defaults = {
    id: chance.guid(),
    partNumber: chance.word(),
    manufacture: chance.word(),
    targetPrice: chance.integer({ min: 1, max: 1000 }),
    quantity: chance.integer({ min: 1, max: 1000 }),
    supplyDate: chance.date(),
    offers: [] as any[]
  };

  return ({
    ...defaults,
    id,
    partNumber,
    manufacture,
    targetPrice,
    quantity,
    supplyDate,
    offers
  });
};

describe('auctions-service', () => {
  describe('get components', () => {
    it('should return component with pending status', () => {
      const daoDriver = auctionsDaoDriver();
      const auctionsService = AuctionsService(daoDriver.api());

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
      const auctionsService = AuctionsService(mock.api());

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