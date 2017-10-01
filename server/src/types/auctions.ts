import { Guid } from './common';

export type TSupplierDTO = {
  email: string;
}

export type TComponentDTO = {
  partNumber: string;
  manufacture: string;
  targetPrice: number;
  quantity: number;
  supplyDate: number;
}

export type TAuctionBomDTO = {
  components: TComponentDTO[];
}

export type TAuctionDTO = {
  suppliers: TSupplierDTO[];
  subject: string;
  message: string;
  bom: TAuctionBomDTO;
  purchaseOrders: TPurchaseOrder[];
}

export type TOfferDTO = {
  components: TOffer[];
}

export type TSupplier = {
  id: Guid;
  email: string;
}

export type TComponent = {
  id: Guid;
  partNumber: string;
  manufacture: string;
  targetPrice: number;
  quantity: number;
  supplyDate: number;
  offers: TOffer[];
  auctionId: Guid;
}

export type TOffer = {
  id: Guid;
  componentId: Guid;
  supplierId: Guid;
  partDate: number;
  supplyDate: number;
  quantity: number;
  price: number;
}

export type TPurchaseOrder = {
  id: Guid;
  auctionId: Guid;
  details: TPurchaseOrderDetail[];
}

export type TPurchaseOrderDetail = {
  componentId: Guid;
  offerId: Guid;
  quantity: number;
}

export type TAuctionBom = {
  components: TComponent[]
}

export type TAuction = {
  id: Guid;
  suppliers: TSupplier[];
  subject: string;
  message: string;
  bom: TAuctionBom;
  purchaseOrders: TPurchaseOrder[];
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