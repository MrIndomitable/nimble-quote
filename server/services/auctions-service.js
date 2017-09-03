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

const AuctionsService = (auctionDetailsService) => {
  const auctions = {};

  const addAuction = (auction) => {
    const id = uuid();

    const details = auction.details.map(detail => {
      return auctionDetailsService.addAuctionDetail(id, detail);
    });

    auctions[id] = Object.assign({}, auction, {id, details});

    return auctions[id];
  };

  const getById = (id) => {
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

const AuctionDetailsService = () => {
  const auctionDetails = {};

  const addAuctionDetail = (auctionId, auctionDetail) => {
    const id = uuid();
    auctionDetails[id] = Object.assign({}, auctionDetail, {id, auctionId});
    return auctionDetails[id];
  };

  const getById = (id) => {
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

module.exports = {AuctionsService, AuctionDetailsService};