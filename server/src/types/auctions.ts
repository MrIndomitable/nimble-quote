import { Guid } from './common';

export type TSupplierDTO = {
  id?: Guid;
  email?: string;
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

export type TOffersDTO = {
  components: TOfferDTO[];
}

export type TOfferDTO =  {
  componentId: Guid;
  quantity: number;
  price: number;
  partDate: number;
  supplyDate: number;
}

export type TPurchaseOrderDTO = {
  auctionId: Guid;
  details: TPurchaseOrderDetail[];
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
  purchaseOrder: TPurchaseOrder; // TODO check if this is actually a list
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