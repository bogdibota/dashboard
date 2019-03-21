import React, { Component } from 'react';
import StatusLight from '../../statusLight/StatusLight';


class StatusTab extends Component {
  render() {
    const { commandId, status } = this.props;
    return (
      <div>
        <StatusLight status={ status[commandId] }/> {status[commandId] || 'UNKNOWN' }
      </div>
    );
  }
}

export default StatusTab;
