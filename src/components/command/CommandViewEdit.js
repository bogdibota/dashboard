import React, { Component, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import styles from './CommandViewEdit.styles';
import { withStyles } from '@material-ui/core';
import PlayIcon from '@material-ui/icons/PlayArrow';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Check';
import Button from '@material-ui/core/Button';

class ViewForm extends Component {
  render() {
    return (
      <div>view</div>
    );
  }
}

class EditForm extends Component {
  render() {
    return (
      <div>
        <TextField
          id="outlined-full-width"
          label="Command name"
          placeholder="Name"
          fullWidth
          disabled
          margin="normal"
          variant="outlined"
          InputLabelProps={ {
            shrink: true,
          } }
        />

        <TextField
          id="outlined-multiline-static"
          label="Command action"
          fullWidth
          multiline
          rows="6"
          margin="normal"
          variant="outlined"
        />
      </div>
    );
  }
}

class CommandViewEdit extends Component {
  state = {
    isEdit: false,
  };

  toggleEditState = () => this.setState(({isEdit}) => ({isEdit: !isEdit}));

  render() {
    const {classes} = this.props;
    const {isEdit} = this.state;
    return (
      <Fragment>
        <Grid container className={ classes.mainWindow }>
          { isEdit ? (
            <EditForm/>
          ) : (
            <ViewForm/>
          ) }
        </Grid>
        <Grid container className={ classes.footerBar }>
          { !isEdit && <Grid item xs="auto">
            <Button variant="contained" color="secondary" className={ '' }
                    onClick={ () => null }>
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
              <Button variant="contained" color="secondary" className={ '' }
                      onClick={ this.toggleEditState }>
                <SaveIcon className={ classes.iconButton }/>
                Save
              </Button>
            </Fragment> : <Fragment>
              <Button variant="contained" color="primary" className={ '' }
                      onClick={ this.toggleEditState }>
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
