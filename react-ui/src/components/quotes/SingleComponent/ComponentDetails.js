import React from 'react';

const LabelAndValue = ({label, value}) => (
  <div className="col-lg-2 ">
    <p>{label}</p>
    <p className=""><strong>{value}</strong></p>
  </div>
);

export const ComponentDetails = ({manufacture, partNumber, quantity, targetPrice, partDate}) => {
  return <div className="text-center">
    <LabelAndValue label="Manufacture" value={manufacture}/>
    <LabelAndValue label="Part No." value={partNumber}/>
    <LabelAndValue label="Quantity" value={quantity}/>
    <LabelAndValue label="Target price" value={targetPrice}/>
    <LabelAndValue label="Part date" value={partDate}/>
    <div className="col-lg-2">
      <br/>
      <button className="btn btn-default">Send to archive</button>
    </div>
  </div>;
};
