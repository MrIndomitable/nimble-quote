import { anAuction, anOffer, aSupplier, aPurchaseOrder, aPurchaseOrderDetails } from './test-auction';
import { aComponent } from './test-auction-details';

export function generateTestData(suppliersService: any, auctionService: any) {
  suppliersService.addSupplier('user-id', aSupplier());
  suppliersService.addSupplier('user-id', aSupplier());
  suppliersService.addSupplier('user-id', aSupplier());
  suppliersService.addSupplier('user-id', aSupplier());

  const [supplier1, supplier2, supplier3, supplier4] = suppliersService.getAll('user').suppliers;

  auctionService.addAuction(anAuction([
    aComponent(),
    aComponent()
  ], [
    supplier1,
    supplier2,
    supplier3,
    supplier4
  ]));
  auctionService.addAuction(anAuction([
    aComponent(),
    aComponent()
  ], [
    supplier2
  ]));

  const [auction] = auctionService.getAll().auctions;
  const [component1, component2] = auction.bom.components;

  auctionService.addOffer(supplier1.id, { components: [
    anOffer(component2.id)
  ] });
  const [component] = auctionService.getComponentById(component2.id).components;
  const [offer1] = component.offers;

  auctionService.addOffer(supplier2.id, { components: [
    anOffer(component1.id),
    anOffer(component2.id)
  ] });

  const order = aPurchaseOrder(auction.id, [
    aPurchaseOrderDetails(component1.id, offer1.id)
  ]);

  auctionService.addPurchaseOrder(order);
}
