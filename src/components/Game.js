import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { withSocket } from 'components/context/SocketContext';
import { Flex } from 'components/uikit';
import GameSummary from 'components/GameSummary';
import GameTable from 'components/GameTable';

const StyledGame = styled(Flex)`
  height: 100%;
  overflow-y: scroll;
`;

const Game = ({ user, gameId, socket }) => {
  const [game, setGame] = useState({});

  useEffect(
    () => {
      socket.on('server::game', x => setGame(x || {}));
      socket.emit('client::joinRoom', { gameId }, x => setGame(x || {}));
    },
    [gameId]
  );

  return (
    <StyledGame flexGrow={1} flexDirection="column" p={3}>
      <GameSummary
        {...{ user, gameId, game }}
        acceptGame={() => socket.emit('client::acceptGame', { gameId })}
      />
      <Flex buffer flexGrow={1}>
        <GameTable {...{ game }} />
      </Flex>
    </StyledGame>
  );
};

export default withSocket(Game);
