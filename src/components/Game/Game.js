import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { withSocket } from 'components/context/SocketContext';
import { Div, Flex } from 'components/uikit';

import Board from './Board';
import Summary from './Summary';

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
      <Summary {...{ gameId, game }} />
      <Flex
        buffer
        flexGrow={1}
        flexDirection="row"
        justifyContent="space-around"
      >
        {game.id && (
          <>
            <Div width="45%">
              <Board player="host" {...{ user, game }} />
            </Div>
            <Div width="45%">
              <Board player="opponent" {...{ user, game }} />
            </Div>
          </>
        )}
      </Flex>
    </StyledGame>
  );
};

export default withSocket(Game);
