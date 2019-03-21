import React, {Component} from "react";
import stripAnsi from 'strip-ansi';
import withStyles from "@material-ui/core/es/styles/withStyles";
import styles from './LogsTab.styles';
import Paper from "@material-ui/core/Paper";

class LogsTab extends Component {
  logsEnd = React.createRef();

  getLogElement = (classes, status, data, index) => {
    switch (status) {
      case 'ERROR':
        return (<div key={`log-${index}`} className={classes.errorText}>[{index}]> {stripAnsi(data)}</div>);
      default:
        return (<div key={`log-${index}`} className={classes.normalText}>[{index}]> {stripAnsi(data)}</div>);
    }
  };

  scrollToBottom = () => {
    this.logsEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const {commandId, logs, classes} = this.props;
    const currentLogs = logs && (logs[commandId] || []);
    return (
      <Paper className={classes.gray}>
        {currentLogs.map((it, index) => this.getLogElement(classes, it.status, it.data, index))}
        <div ref={ this.logsEnd }>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(LogsTab);
