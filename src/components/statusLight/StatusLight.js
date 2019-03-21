import React, {Component} from 'react';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import Tooltip from "@material-ui/core/Tooltip";
import withStyles from "@material-ui/core/es/styles/withStyles";
import styles from './StatusLight.styles';

class StatusLight extends Component {

  getStatusElement = (classes, status) => {
    switch (status) {
      case 'RUNNING':
        return (<div className={ `${classes.container} ${classes.running}` }></div>);
      case 'DONE_SUCCESS':
        return (<DoneIcon className={ `${classes.container} ${classes.success}` }/>);
      case 'DONE_ERROR':
        return (<ClearIcon className={ `${classes.container} ${classes.failed}` }/>);
      default:
        return (<div className={ `${classes.container} ${classes.defaultElement}` }></div>);
    }
  };

  render() {
    const {status, classes} = this.props;
    return (
      <Tooltip title={ status ? status : 'UNKNOWN' } className={ classes.container }>
        {this.getStatusElement(classes, status)}
      </Tooltip>
    );
  }
}

export default withStyles(styles)(StatusLight);
