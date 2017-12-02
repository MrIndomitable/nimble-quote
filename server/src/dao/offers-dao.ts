import { TOffer } from "../types/auctions";
import { Guid } from "../types/common";

export interface IOffersDao {
  addOffer(supplierId: Guid, offers: TOffer[]): Promise<void>;
  getOffersByComponentId(componentId: Guid): Promise<TOffer[]>,
  getSuppliersByOffers(offerIds: Guid[]): Promise<Guid[]>;
  getOfferById(offerId: Guid): Promise<TOffer>;
}

type TDBOffer = {
  id: Guid;
  supplierId: Guid;
  componentId: Guid;
  price: number;
  quantity: number;
  partDate: number;
  supplyDate: number;
}

export const OffersDao = (): IOffersDao => {
  const _offers: { [offerId: string]: TDBOffer } = {};
  const _offersBySupplier: { [supplierId: string]: Guid[] } = {};
  const _offersByComponent: { [componentId: string]: Guid[] } = {};

  const addOffer = async(supplierId: Guid, offers: TOffer[]): Promise<void> => {
    offers.forEach((offer: TOffer) => {
      _offers[offer.id] = Object.assign({}, offer, {supplierId});

      _offersBySupplier[supplierId] = _offersBySupplier[supplierId] || [];
      _offersBySupplier[supplierId].push(offer.id);

      _offersByComponent[offer.componentId] = _offersByComponent[offer.componentId] || [];
      _offersByComponent[offer.componentId].push(offer.id);
    });
  };

  const getOfferById = (offerId: Guid): Promise<TOffer> => Promise.resolve(_offers[offerId]);

  const getOffersByComponentId = (componentId: Guid): Promise<TOffer[]> => {
    const offerIds = _offersByComponent[componentId] || [];
    return Promise.all(offerIds.map(getOfferById));
  };

  const getSuppliersByOffers = (offerIds: Guid[]): Promise<Guid[]> => {
    const suppliers = offerIds.map(id => _offers[id].supplierId);
    return Promise.resolve([...new Set(suppliers)]);
  };

  return {
    addOffer,
    getOffersByComponentId,
    getSuppliersByOffers,
    getOfferById
  }
};