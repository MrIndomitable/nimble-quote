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
}
