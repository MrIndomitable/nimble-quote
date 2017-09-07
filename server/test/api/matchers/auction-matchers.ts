export const bomWith = component => ({
  components: expect.arrayContaining([
    expect.objectContaining(component)
  ])
});

export const auctionWith = bom => expect.objectContaining({
  bom
});

export const auctionsContaining = auction => ({
  auctions: expect.arrayContaining([
    auction
  ])
});
