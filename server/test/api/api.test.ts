import * as request from 'supertest';
import { configureApp } from '../../src/server';
import { bomWith, auctionWith, auctionsContaining } from './matchers/auction-matchers';
import { testConfig } from './common/test-config';

describe("auctions api", () => {
  const component = {
    manufacture: 'man',
    partNumber: 'part-id',
    quantity: 3,
    targetPrice: 10,
    supplyDate: 12345
  };

  const auction = {
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
    await app.post("/api/auctions")
      .send(auction)
      .expect(201)
      .then(res => res.body);

    await app.get("/api/auctions")
      .expect(200)
      .then(res => {
        expect(res.body).toEqual(
          auctionsContaining(
            auctionWith(
              bomWith(component)
            )
          )
        );
      });
  });
});
