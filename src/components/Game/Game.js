import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import u from 'updeep';

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
  const [events, setEvents] = useState([]);
  const updateGame = update => u(update, game);

  useEffect(() => {
    socket.on('server::game', x => {
      console.log('game', x);
      setGame(x || {});
    });
  }, []);

  useEffect(
    () => {
      socket.once('server::gameEvents', x => {
        console.log('events', [...events, ...x]);
        setEvents([...events, ...x]);
      });
    },
    [events]
  );

  useEffect(
    () => {
      if (gameId) socket.emit('client::joinRoom', { gameId });
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
              <Board player="host" {...{ user, game, updateGame }} />
            </Div>
            <Div width="45%">
              <Board player="opponent" {...{ user, game, updateGame }} />
            </Div>
          </>
        )}
      </Flex>
    </StyledGame>
  );
};

export default withSocket(Game);
