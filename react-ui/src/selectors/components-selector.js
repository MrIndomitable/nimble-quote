export const componentsSelector = ({auctions}) => {
  return auctions
    .reduce((components, auction) =>
      [...components, ...auction.bom.components], []
    );
};