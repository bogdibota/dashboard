import React from 'react';
import ReactDOM from 'react-dom';
import CommandTree from './Tree';

const mockParams = {
  commands: {},
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CommandTree { ...mockParams }/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
