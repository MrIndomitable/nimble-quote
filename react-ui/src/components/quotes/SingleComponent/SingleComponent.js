import React from 'react';
import {connect} from 'react-redux';
import {PendingSuppliersTable} from './PendingSuppliersTable';
import {ComponentOffersTable} from './ComponentOffersTable';
import {ComponentDetails} from './ComponentDetails';

export const SingleComponent = () => {
  return (
    <div className="container">
      <div className="row bg-warning inline">
        <ComponentDetails />
      </div>
      <div className="table-container col-lg-12">
        <ComponentOffersTable />
      </div>
      <div className="table-container col-lg-12">
        <h2>Pending</h2>
        <PendingSuppliersTable/>
      </div>
    </div>
  )
};