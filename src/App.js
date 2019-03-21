import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

import { CommandTree, CommandViewEdit } from './components';
import { command } from './redux/action';

import styles from './App.styles';
import ConfirmationModal from './components/ConfirmationModal';
import DeleteIcon from '@material-ui/icons/Delete';

const mapStateToProps = ({command: {commands, selectedCommand, errorMessage, status}}) => ({
  commands, selectedCommand, errorMessage, status
});

const mapDispatchToProps = dispatch =>
  ({
    actions: bindActionCreators({
      createCommand: command.create.emit.create,
      selectCommand: command.select.emit.create,
      clearError: command.clearError.emit.create,
      updateCommand: command.update.emit.create,
      runCommand: command.run.emit.create,
      deleteCommand: command.delete.emit.create,
    }, dispatch),
  });

class App extends Component {
  state = {
    modalOpen: {
      confirmation: false,
    },
    modalData: {},
  };

  handleModalOpen = (modalType) => (modalData = {}) => {
    this.setState(({ modalOpen }) => ({ modalOpen: { ...modalOpen, [modalType]: true }, modalData }));
  };

  handleModalClose = (modalType) => () => {
    this.setState(({ modalOpen }) => ({ modalOpen: { ...modalOpen, [modalType]: false }, modalData: {} }));
  };

  constructor(props) {
    super(props);

    this.handleCreateCommand = this.handleCreate.bind(this, false);
    this.handleCreateFolder = this.handleCreate.bind(this, true);
  }

  handleCreate(isFolder, name) {
    const {actions: {createCommand}} = this.props;
    createCommand({isFolder, name});
  }

  deleteSelectedCommand = ()=> {
    const {actions: {deleteCommand}, selectedCommand} = this.props;
    deleteCommand(selectedCommand);
    this.handleModalClose('confirmation')();
  };

  render() {
    const {
      classes, commands, selectedCommand, errorMessage, status,
      actions: {selectCommand, clearError, updateCommand, runCommand, deleteCommand},
    } = this.props;
    const { modalOpen } = this.state;
    return (
      <Grid container className={ classes.root }>
        <Grid item xs={ 4 } className={ classes.leftPanel }>
          <CommandTree
            commands={ commands }
            onCreateCommand={ this.handleCreateCommand }
            onCreateFolder={ this.handleCreateFolder }
            onSelectCommand={ (child, id) => selectCommand({selectedCommand: {...child, id}}) }
            status = { status }
          />
        </Grid>
        <Grid item xs={ 8 } className={ classes.rightPanel }>
          { selectedCommand ? (
            selectedCommand.children ? (
              <div>
                <Button variant="contained" onClick={ () => selectCommand() } className={ classes.leftIcon }>
                  <CloseIcon className={ classes.leftIcon }/>
                  Deselect
                </Button>
                <Button variant="contained" color="secondary" className={ classes.leftIcon }
                        onClick={ this.handleModalOpen('confirmation') }>
                  <DeleteIcon className={classes.iconButton} />
                  Delete
                </Button>
                { selectedCommand.label }
              </div>
            ) : (
              <CommandViewEdit
                command={ selectedCommand }
                onUpdateCommand={ updateCommand }
                onRunCommand={ runCommand }
                onDeleteCommand={ deleteCommand }
                openConfirmation={ this.handleModalOpen('confirmation') }
                status = { status }
              />
            )
          ) : 'No command selected' }
        </Grid>
        <Snackbar
          anchorOrigin={ {
            vertical: 'bottom',
            horizontal: 'center',
          } }
          open={ !!errorMessage }
          autoHideDuration={ 6000 }
          onClose={ clearError }
          message={ errorMessage }
        />
        <ConfirmationModal
          title={ `Remove ${selectedCommand && selectedCommand.label}?`}
          text={ `Are you sure you want to remove ${selectedCommand && selectedCommand.label}?` }
          open={ modalOpen.confirmation }
          handleClose={ this.handleModalClose('confirmation') }
          handleConfirm={ this.deleteSelectedCommand }
        />
      </Grid>
    );
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App));
