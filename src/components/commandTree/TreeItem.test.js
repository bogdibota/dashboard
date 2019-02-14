import React from 'react';
import ReactDOM from 'react-dom';
import CommandTreeItem from './TreeItem';

const mockParams = {
  command: {},
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CommandTreeItem { ...mockParams }/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
