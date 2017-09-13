import React from 'react';

export const ComponentDetails = ({manufacture, partNumber, quantity, targetPrice, partDate}) => <div className="text-center">
  <div className="col-lg-2 ">
    <p> Manufacture</p>
    <p className=""><strong>{manufacture}</strong></p>
  </div>
  <div className="col-lg-2">
    <p className="">Part No.</p>
    <p className=""><strong>{partNumber}</strong></p>
  </div>
  <div className="col-lg-2">
    <p className="">Quantity</p>
    <p className=""><strong>{quantity}</strong></p>
  </div>
  <div className="col-lg-2">
    <p className="">Target price</p>
    <p className=""><strong>{targetPrice}</strong></p>
  </div>

  <div className="col-lg-2">
    <p className="">Part date</p>
    <p className=""><strong>{partDate}</strong></p>
  </div>
  <div className="col-lg-2">
    <br/>
    <button className="btn btn-default">Send to archive</button>
  </div>
</div>;
