export const getAuctionById = state => id => {
  const auctionsById = state.auctions.reduce((auctions, auction) => ({
    ...auctions,
    [auction.id]: auction
  }), {});

  return auctionsById[id];
};
