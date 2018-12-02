import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'emotion-theming';
import io from 'socket.io-client';

import { apiHost, apiPort } from './common/config';

import App from './components/App';
import SocketContext from './components/context/SocketContext';
import theme from './common/theme';

import './index.css';

const socket = io(`http://${apiHost}:${apiPort}`);

ReactDOM.render(
  <SocketContext.Provider value={socket}>
    <ThemeProvider {...{ theme }}>
      <App />
    </ThemeProvider>
  </SocketContext.Provider>,
  document.getElementById('root')
);
