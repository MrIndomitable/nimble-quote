import * as request from 'supertest';
import { configureApp } from '../../src/server';
import { testConfig } from './common/test-config';
import { NewBomDriver } from './drivers/new-bom.driver';
import { TAuctionDTO, ComponentStatus } from '../../src/types/auctions';

describe("components api", () => {
  const component = {
    manufacture: 'man',
    partNumber: 'part-id',
    quantity: 3,
    targetPrice: 10,
    supplyDate: 12345
  };

  const auction: TAuctionDTO = {
    suppliers: [{
      email: 'a@b.com'
    }],
    subject: 'subject',
    message: 'message',
    bom: {
      components: [
        component
      ]
    }
  };

  it("add an auction", async() => {
    const app = request(configureApp(testConfig));
    await NewBomDriver(app).addBom(auction);

    const componentsResultWith = ({ components }) => ({
      components: expect.arrayContaining(components)
    });

    const componentWith = (component) => (
      expect.objectContaining(component)
    );

    await app.get("/api/components")
      .expect(200)
      .then(res => {
        expect(res.body).toEqual(
          componentsResultWith({
            components: [componentWith({
              status: ComponentStatus.PENDING,
              manufacture: component.manufacture,
              partNumber: component.partNumber,
              quantity: component.quantity,
              targetPrice: component.targetPrice,
              date: component.supplyDate,
              offersCount: 0
            })]
          })
        );
      });
  });
});
