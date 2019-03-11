import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import styles from './TreeItem.styles';

class TreeItem extends Component {
  render() {
    const {classes, command, indent = -1, onSelectCommand} = this.props;
    return ([
      <div className={ classes.item } key={ `command` }>
        { command.label && (
          <Button className={ classes.button } style={ {marginLeft: indent * 15} }
                  onClick={ () => onSelectCommand(command, command.id || command.label) }
          >
            <span className={ classes.commandLabel }>{ command.label }</span>
            { !command.children && <span>O X</span> }
          </Button>
        ) }
      </div>,
      ...(command.children || []).map((childCommand, idx) => (
        <TreeItemWithStyles command={ childCommand } key={ `childCommand-${ idx }` } indent={ indent + 1 }
                            onSelectCommand={ (child, idUntilNow) => onSelectCommand(child, `${ command.id || command.label }*${ idUntilNow }`) }
        />
      )),
    ]);
  }
}

const TreeItemWithStyles = withStyles(styles)(TreeItem);

export default TreeItemWithStyles;
