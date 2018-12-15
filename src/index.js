import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'emotion-theming';
import io from 'socket.io-client';
import { BrowserRouter } from 'react-router-dom';

import { apiHost, apiPort } from './common/config';

import App from './components/App';
import SocketContext from './components/context/SocketContext';
import ModalContext from './components/context/ModalContext';
import theme from './common/theme';

import './index.css';

const Root = () => {
  const socket = io(`http://${apiHost}:${apiPort}`);

  return (
    <ModalContext.Provider>
      <SocketContext.Provider value={socket}>
        <ThemeProvider {...{ theme }}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </SocketContext.Provider>
    </ModalContext.Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
