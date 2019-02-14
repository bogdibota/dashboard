import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const initialState = {
    obj: {},
};

class InputModal extends Component {
    state = initialState;

    updateProperty = (property) => ({ target: { value } }) => {
        this.setState(({ obj }) => ({
            obj: {
                ...obj,
                [property]: value,
            },
        }));
    };

    renderInputField({ name, label }) {
        return (
            <TextField
                autoFocus
                margin="dense"
                fullWidth
                key={`InputModal-${name}`}
                label={label}
                value={this.state.obj[name] || ''}
                onChange={this.updateProperty(name)}
            />
        );
    }

    handleClose = () => {
        this.props.handleClose();
        this.setState(initialState);
    }

    render() {
        const { open, handleSave, title, text, fields } = this.props;
        const { obj } = this.state;
        return (
            <Dialog
                open={open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{text}</DialogContentText>
                    {fields.map(({ name, label }) => this.renderInputField({ name, label }))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={() => handleSave(obj) + this.handleClose()} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default InputModal;
