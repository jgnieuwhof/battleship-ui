import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';

import { withSocket } from 'components/context/SocketContext';
import Sidebar from 'components/Sidebar';
import Game from 'components/Game';
import { Flex } from 'components/uikit';

const Dashboard = ({
  match: {
    params: { gameId }
  },
  history,
  socket,
  user
}) => {
  const [games, setGames] = useState({});

  useEffect(() => {
    if (!Object.keys(games).length) {
      socket.emit('client::games', null, setGames);
    }
  });

  useEffect(
    () => {
      socket.on('server::games', setGames);
    },
    [socket]
  );

  return (
    <Flex>
      <Sidebar
        {...{ user, gameId, games }}
        setGame={id => history.push(`/games/${id}`)}
      />
      <Game {...{ user, gameId }} />
    </Flex>
  );
};

export default withSocket(withRouter(Dashboard));
