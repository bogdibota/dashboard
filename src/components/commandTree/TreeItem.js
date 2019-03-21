import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import styles from './TreeItem.styles';
import StatusLight from '../statusLight/StatusLight';

class TreeItem extends Component {
    render() {
    const {classes, command, indent = -1, onSelectCommand, parent, status} = this.props;
    return ([
      <div className={ classes.item } key={ `command` }>
        { command.label && (
          <Button className={ classes.button } style={ {marginLeft: indent * 15} }
                  onClick={ () => onSelectCommand(command, command.id || command.label) }
          >
            <span className={ classes.commandLabel }>{ command.label }</span>
            { !command.children && <StatusLight status={ status[`${parent}*${command.id || command.label}`] }/> }
          </Button>
        ) }
      </div>,
      ...(command.children || []).map((childCommand, idx) => (
        <TreeItemWithStyles command={ childCommand } key={ `childCommand-${ idx }` } indent={ indent + 1 } parent={ `${parent ? parent + '*' : ''}${ command.id || command.label }`}
                            onSelectCommand={ (child, idUntilNow) => onSelectCommand(child, `${ command.id || command.label }*${ idUntilNow }`) } status = { status }
        />
      )),
    ]);
  }
}

const TreeItemWithStyles = withStyles(styles)(TreeItem);

export default TreeItemWithStyles;
