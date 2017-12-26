import React from 'react';
import {connect} from 'react-redux';
import {componentsSelector, findComponentById} from '../../../selectors/components-selector';
import {withRouter} from 'react-router';

const ProgressItem = ({label, value}) => (
  <div className="progress-item" style={{ width: value+'%' }}>
    <p>{label} <strong>{value}</strong>%</p>
    <div className={"progress-item-bar bar-" + label}>
    </div>
  </div>
);

const ProgressDetailsComp = ({pending, offers, imminent, archive, total}) => {
  return <div className="progress-item-wrapper">
    <ProgressItem label="Pending" value={pending/total*100} />
    <ProgressItem label="Offers" value={offers/total*100} />
    <ProgressItem label="Emminent" value={imminent/total*100}/>
    <ProgressItem label="Archive" value={archive/total*100}/>
  </div>;
};

const mapStateToProps = (state, {match}) => {

  let pending = componentsSelector(state, 'pending');
  let offers = componentsSelector(state, 'offers');
  let imminent = componentsSelector(state, 'imminent');
  let archive = componentsSelector(state, 'archive');

  return {
    pending: pending.length,
    offers: offers.length,
    imminent: imminent.length,
    archive: archive.length,
    total: pending.length + offers.length + imminent.length + archive.length,
  }
};

export const ProgressDetails = withRouter(connect(mapStateToProps)(ProgressDetailsComp));