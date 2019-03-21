import React, { Component } from 'react';
import { Paper, Tab, Tabs, Typography, withStyles } from '@material-ui/core';

import styles from './ViewForm.styles';
import StatusTab from './tabs/StatusTab';
import LogsTab from './tabs/LogsTab';

class ViewForm extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({value});
  };

  render() {
    const {command, classes, status, logs} = this.props;
    const {value} = this.state;
    return (
      <div className={ classes.root }>
        <Typography component="h4" variant="h4">
          { command.label }
        </Typography>
        <Paper className={ classes.tabs }>
          <Tabs
            value={ this.state.value }
            onChange={ this.handleChange }
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Status"/>
            <Tab label="Logs"/>
            <Tab label="Settings"/>
          </Tabs>
          { value === 0 && <div className={ classes.tabContainer }><StatusTab commandId={ command.id } status={ status }/></div> }
          { value === 1 && <div className={ classes.tabContainer }><LogsTab commandId={ command.id } logs={ logs }/></div> }
          { value === 2 && <div className={ classes.tabContainer }>Settings tab</div> }
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(ViewForm);
