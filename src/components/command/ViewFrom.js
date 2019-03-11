import React, { Component } from 'react';
import { Paper, Tab, Tabs, Typography, withStyles } from '@material-ui/core';

import styles from './ViewForm.styles';
import StatusTab from './tabs/StatusTab';

class ViewForm extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({value});
  };

  render() {
    const {command, classes} = this.props;
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
          { value === 0 && <div className={ classes.tabContainer }><StatusTab/></div> }
          { value === 1 && <div className={ classes.tabContainer }>Logs tab</div> }
          { value === 2 && <div className={ classes.tabContainer }>Settings tab</div> }
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(ViewForm);
