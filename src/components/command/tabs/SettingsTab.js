import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";

class SettingsTab extends Component {
  state = {
    runArgs: ''
  };

  handleEdit = (fieldName) => (event) => this.props.handleEdit(fieldName)(event.target.value);


  handleChange = (event) => {
    this.setState({runArgs: event.target.value});
  };

  componentDidMount() {
    this.setState({runArgs: this.props.command.runArgs});
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.command.runArgs) {
      this.setState({runArgs: ''});
    } else if (nextProps.command.runArgs !== this.state.runArgs) {
      this.setState({runArgs: nextProps.command.runArgs});
    }
  }

  render() {
    return (
      <TextField
        id="args"
        label="Args"
        variant="outlined"
        value={this.state.runArgs}
        onChange={this.handleChange}
        onBlur={this.handleEdit('runArgs')}
        margin="normal"
      />
    );
  }
}

export default SettingsTab;
