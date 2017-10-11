import { anAuction, anOffer, aSupplier, aPurchaseOrder, aPurchaseOrderDetails } from './test-auction';
import { aComponent } from './test-auction-details';
import { Guid } from "../types/common";
import { TSupplier, TSupplierDTO } from "../types/auctions";

export function generateTestData(suppliersService: { getAll: ((userId: Guid) => { suppliers: TSupplier[] }); addSupplier: ((userId: Guid, { email }: TSupplierDTO) => any) }, auctionService: IAuctionsService) {
  suppliersService.addSupplier('user-id', aSupplier());
  suppliersService.addSupplier('user-id', aSupplier());
  suppliersService.addSupplier('user-id', aSupplier());
  suppliersService.addSupplier('user-id', aSupplier());

  const [supplier1, supplier2, supplier3, supplier4] = suppliersService.getAll('user').suppliers;

  auctionService.addAuction(anAuction([
    aComponent(),
    aComponent()
  ], [
    supplier1.id,
    supplier2.id,
    supplier3.id,
    supplier4.id
  ]));
  auctionService.addAuction(anAuction([
    aComponent(),
    aComponent()
  ], [
    supplier2.id
  ]));

  const [auction] = auctionService.getAll().auctions;
  const [component1, component2] = auction.bom.components;

  const offer1 = anOffer(component2.id, supplier1.id);
  auctionService.addOffer(supplier1.id, { components: [offer1] });

  const offer2 = anOffer(component1.id, supplier2.id);
  const offer3 = anOffer(component2.id, supplier2.id);
  auctionService.addOffer(supplier2.id, { components: [offer2, offer3] });

  const order = aPurchaseOrder(auction.id, [
    aPurchaseOrderDetails(component1.id, offer1.id)
  ]);

  auctionService.addPurchaseOrder(order);
}
