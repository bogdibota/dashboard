import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

import TreeItem from './TreeItem';
import InputModal from '../InputModal';

import styles from './Tree.styles';

class CommandTree extends Component {
  state = {
    modalOpen: {
      create: false,
    },
    isFolder: false,
  };

  handleModalOpen = (modalType) => (isFolder) => {
    this.setState(({modalOpen}) => ({modalOpen: {...modalOpen, [modalType]: true}, isFolder}));
  };

  handleModalClose = (modalType) => () => {
    this.setState(({modalOpen}) => ({modalOpen: {...modalOpen, [modalType]: false}}));
  };

  render() {
    const {classes, commands, onCreateCommand, onCreateFolder, onSelectCommand, status} = this.props;
    const {modalOpen, isFolder} = this.state;
    return ([
      <Grid container className={ classes.root } key="grid">
        <Grid item xs={ 12 }>
          <Grid container className={ classes.buttons }>
            <Grid item>
              <Button variant="contained" color="secondary" className={ classes.button }
                      onClick={ () => this.handleModalOpen('create')(false) }>
                <AddIcon className={ classes.leftIcon }/>
                Command
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" className={ classes.button }
                      onClick={ () => this.handleModalOpen('create')(true) }>
                <AddIcon className={ classes.leftIcon }/>
                Folder
              </Button>
            </Grid>
          </Grid>
          <Grid container className={ classes.tree }>
            <TreeItem command={ commands } onSelectCommand={ onSelectCommand } status = { status }/>
          </Grid>
        </Grid>
      </Grid>,
      <InputModal
        key="new-modal"
        title={ `Add new ${ isFolder ? 'folder' : 'command' }` }
        fields={ [ {name: 'name', label: 'Name'} ] }
        open={ modalOpen.create }
        handleClose={ this.handleModalClose('create') }
        handleSave={ ({name}) => isFolder ? onCreateFolder(name) : onCreateCommand(name) }
      />,
    ]);
  }
}

export default withStyles(styles)(CommandTree);
