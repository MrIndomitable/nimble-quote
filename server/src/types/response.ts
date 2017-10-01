import { Guid } from './common';

export type TAuctionsResult = {
  auctions: TAuctionResult[];
}

export type TAuctionResult = {
  id: Guid;
  subject: string;
  message: string;
  bom: TComponentsResult;
  suppliers: TSupplierResult[]
}

export type TSupplierResult = {
  id: Guid;
  email: string;
}

export type TComponentsResult = {
  components: TComponentResult[];
}

export type TComponentsWithOffersResult = {
  components: TComponentWithOffersResult[];
}

export enum ComponentStatus {
  PENDING = "PENDING",
  HAS_OFFERS = "HAS_OFFERS",
  IN_PURCHASE = "IN_PURCHASE",
  ARCHIVED = "ARCHIVED"
}

export type TComponentWithOffersResult = TComponentResult & {
  offers: TOfferResult[];
}

export type TComponentResult = {
  id: Guid,
  status: ComponentStatus;
  manufacture: string;
  partNumber: string;
  quantity: number;
  targetPrice: number;
  date: number;
  offersCount: number;
  auctionId: Guid;
}

export type TOfferResult = {}