import React from 'react';

import { withSocket } from 'components/context/SocketContext';
import { Button } from 'components/uikit';

const JoinButton = ({ socket, gameId }) => {
  return (
    <Button onClick={() => socket.emit('client::acceptGame', { gameId })}>
      join
    </Button>
  );
};

export default withSocket(JoinButton);
