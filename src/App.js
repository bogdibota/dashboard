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

const mapStateToProps = ({command: {commands, selectedCommand, errorMessage}}) => ({
  commands, selectedCommand, errorMessage,
});

const mapDispatchToProps = dispatch =>
  ({
    actions: bindActionCreators({
      createCommand: command.create.emit.create,
      selectCommand: command.select.emit.create,
      clearError: command.clearError.emit.create,
    }, dispatch),
  });

class App extends Component {
  constructor(props) {
    super(props);

    this.handleCreateCommand = this.handleCreate.bind(this, false);
    this.handleCreateFolder = this.handleCreate.bind(this, true);
  }

  handleCreate(isFolder, name) {
    const {actions: {createCommand}} = this.props;
    createCommand({isFolder, name});
  }

  render() {
    const {
      classes, commands, selectedCommand, errorMessage,
      actions: {selectCommand, clearError},
    } = this.props;
    return (
      <Grid container className={ classes.root }>
        <Grid item xs={ 4 } className={ classes.leftPanel }>
          <CommandTree
            commands={ commands }
            onCreateCommand={ this.handleCreateCommand }
            onCreateFolder={ this.handleCreateFolder }
            onSelectCommand={ (child, id) => selectCommand({selectedCommand: {...child, id}}) }
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
                { selectedCommand.label }
              </div>
            ) : (
              <CommandViewEdit command={ selectedCommand }/>
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
      </Grid>
    );
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App));
