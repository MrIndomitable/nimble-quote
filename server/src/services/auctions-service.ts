const uuid = require('uuid').v4;

/**
 * type Guid = string;
 *
 * type Supplier = {
 *  id: Guid;
 *  email: string;
 * }
 *
 * type Auction = {
 *  id: Guid;
 *  suppliers: Supplier: [];
 *  subject: string;
 *  message: string;
 *  issueDate: number;
 *  details: AuctionDetails[];
 * }
 *
 * type AuctionDetails = {
 *  id: Guid;
 *  partNumber: string;
 *  manufacture: string;
 *  targetPrice: number;
 *  quantity: number;
 *  supplyDate: number;
 * }
 */

export const AuctionsService = (auctionDetailsService: any) => {
  const auctions: { [id: string]: any; } = {};

  const addAuction = (auction: any) => {
    const id = uuid();

    const details = auction.details.map((detail: any) => {
      return auctionDetailsService.addAuctionDetail(id, detail);
    });

    auctions[id] = Object.assign({}, auction, {id, details});

    return auctions[id];
  };

  const getById = (id: string) => {
    return auctions[id];
  };

  const getAll = () => {
    return auctions;
  };

  return {
    addAuction,
    getById,
    getAll
  }
};

export const AuctionDetailsService = () => {
  const auctionDetails: { [id: string]: string; } = {};

  const addAuctionDetail = (auctionId: string, auctionDetail: any) => {
    const id = uuid();
    auctionDetails[id] = Object.assign({}, auctionDetail, {id, auctionId});
    return auctionDetails[id];
  };

  const getById = (id: string) => {
    return auctionDetails[id];
  };

  const getAll = () => {
    return auctionDetails
  };

  return {
    addAuctionDetail,
    getById,
    getAll
  }
};