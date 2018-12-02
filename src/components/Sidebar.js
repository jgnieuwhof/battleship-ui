import React from 'react';

import { withSocket } from './context/SocketContext';

import { Div } from './uikit';

const Sidebar = ({ socket, user, game, setGame }) => (
  <Div width={200} pl={3} pr={3}>
    Sidebar
  </Div>
);

export default withSocket(Sidebar);
