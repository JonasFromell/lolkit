import Application from './components/Application';
import HomeRoute from './routes/HomeRoute';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

ReactDOM.render(
  <Relay.RootContainer
    Component={Application}
    route={new HomeRoute()}
  />,
  document.getElementById('root')
);
