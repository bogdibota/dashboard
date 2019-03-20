import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class ConfirmationModal extends Component {

  handleClose = () => {
    this.props.handleClose();
  };

  handleConfirm = () => {
    this.props.handleConfirm();
  };

  render() {
    const {open, title, text} = this.props;
    return (
      <Dialog
        open={ open }
        onClose={ this.handleClose }
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title">{ title }</DialogTitle>
        <DialogContent>
          <DialogContentText>{ text }</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={ this.handleClose }>
            Cancel
          </Button>
          <Button onClick={ this.handleConfirm } color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ConfirmationModal;
