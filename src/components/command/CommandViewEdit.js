import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { Button, Grid, TextField, withStyles } from '@material-ui/core';
import PlayIcon from '@material-ui/icons/PlayArrow';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Check';

import ViewForm from './ViewFrom';

import styles, { editFormStyles } from './CommandViewEdit.styles';


class EditForm extends Component {

  handleEdit = (fieldName) => (event) => this.props.handleCommandEdit(fieldName)(event.target.value);

  render() {
    const {classes, command} = this.props;

    return (
      <div className={ classes.root }>
        <TextField
          id="outlined-full-width"
          label="Command name"
          placeholder="Name"
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={ {
            shrink: true,
          } }
          value={ command.label }
          onChange={ this.handleEdit('label') }
        />

        <TextField
          id="outlined-multiline-static"
          label="Command action"
          fullWidth
          multiline
          rows="6"
          margin="normal"
          variant="outlined"
          value={ command.action }
          onChange={ this.handleEdit('action') }
        />
      </div>
    );
  }
}

const EditFormWithStyles = withStyles(editFormStyles)(EditForm);

class CommandViewEdit extends Component {
  state = {
    isEdit: false,
    commandToEdit: null,
  };

  toggleEditState = () => this.setState(({isEdit}) => ({isEdit: !isEdit}));

  editCommand = () => {
    this.setState({commandToEdit: _.cloneDeep(this.props.command), isEdit: true});

  };

  saveCommand = () => {
    this.props.onUpdateCommand(this.state.commandToEdit);
    this.toggleEditState();
  };

  handleCommandEdit = (fieldName) => (newValue) => {
    this.setState(({commandToEdit}) => ({
      commandToEdit: {
        ...commandToEdit,
        [fieldName]: newValue,
      },
    }));
  };

  render() {
    const {classes, command} = this.props;
    const {isEdit, commandToEdit} = this.state;
    return (
      <Fragment>
        <Grid container className={ classes.mainWindow }>
          { isEdit ? (
            <EditFormWithStyles command={ commandToEdit } handleCommandEdit={ this.handleCommandEdit }/>
          ) : (
            <ViewForm command={ command }/>
          ) }
        </Grid>
        <Grid container className={ classes.footerBar }>
          { !isEdit && <Grid item xs="auto">
            <Button variant="contained" color="secondary" onClick={ () => null }>
              <PlayIcon className={ classes.iconButton }/>
              Run
            </Button>
          </Grid> }
          <Grid item xs/>
          <Grid item xs="auto">
            { isEdit ? <Fragment>
              <Button variant="contained" className={ classes.button }
                      onClick={ this.toggleEditState }>
                Cancel
              </Button>
              <Button variant="contained" color="secondary" onClick={ this.saveCommand }>
                <SaveIcon className={ classes.iconButton }/>
                Save
              </Button>
            </Fragment> : <Fragment>
              <Button variant="contained" color="primary" onClick={ this.editCommand }>
                <EditIcon className={ classes.iconButton }/>
                Edit
              </Button>
            </Fragment> }
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(CommandViewEdit);
