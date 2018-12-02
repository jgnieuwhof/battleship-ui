import React from 'react';

import { withSocket } from './context/SocketContext';

import { Div } from './uikit';

const Sidebar = ({ socket, currentUser, currentGame, setCurrentGame }) => (
  <Div width={200} pl={3} pr={3}>
    Sidebar
  </Div>
);

export default withSocket(Sidebar);
