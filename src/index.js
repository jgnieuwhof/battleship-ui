import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'emotion-theming';
import io from 'socket.io-client';

import { apiHost, apiPort } from './common/config';

import App from './components/App';
import SocketContext from './components/context/SocketContext';
import ModalContext from './components/context/ModalContext';
import theme from './common/theme';

import './index.css';

const socket = io(`http://${apiHost}:${apiPort}`);

ReactDOM.render(
  <ModalContext.Provider>
    <SocketContext.Provider value={socket}>
      <ThemeProvider {...{ theme }}>
        <App />
      </ThemeProvider>
    </SocketContext.Provider>
  </ModalContext.Provider>,
  document.getElementById('root')
);
