import React, { createRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { withTheme } from 'emotion-theming';
import u from 'updeep';

import { withSocket } from 'components/context/SocketContext';
import { withResize } from 'components/providers/ResizeProvider';
import { Div, Flex } from 'components/uikit';

import Board from './Board';
import Summary from './Summary';

const StyledGame = styled(Flex)`
  height: 100%;
  overflow-y: hidden;
`;

const viewportRef = createRef();
const gameRef = createRef();

const Game = ({ dimensions, theme, user, gameId, socket }) => {
  const [game, setGame] = useState({});
  const [events, setEvents] = useState([]);
  const updateGame = update => u(update, game);

  useEffect(() => {
    const handler = x => {
      console.log('game', x);
      setGame(x || {});
    };
    socket.on('server::game', handler);
    return () => {
      socket.off('server::game', handler);
    };
  }, []);

  useEffect(
    () => {
      const handler = x => {
        console.log('events', [...events, ...x]);
        setEvents([...events, ...x]);
      };
      socket.on('server::gameEvents', handler);
      return () => {
        socket.off('server::gameEvents', handler);
      };
    },
    [events]
  );

  useEffect(
    () => {
      if (gameId) {
        setEvents([]);
        socket.emit('client::joinRoom', { gameId });
      }
    },
    [gameId]
  );

  const getScale = () => {
    if (!viewportRef.current || !gameRef.current) return 1;
    return Math.min(
      1,
      viewportRef.current.offsetHeight / gameRef.current.offsetHeight
    );
  };

  return (
    <StyledGame flexDirection="column" ref={viewportRef}>
      <Div
        ref={gameRef}
        transform={`scale(${getScale()})`}
        transformOrigin="top center"
      >
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
      </Div>
    </StyledGame>
  );
};

export default withTheme(withSocket(withResize(Game)));
