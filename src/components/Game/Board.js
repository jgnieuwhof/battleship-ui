import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { withSocket } from 'components/context/SocketContext';
import { gameEvent, gameState } from 'common/constants';
import { times } from 'util/array';
import { Div, Flex } from 'components/uikit';
import JoinButton from './JoinButton';
import Ships from './Ships';

const BoardSquare = styled(Div)`
  flex: 1 0 0px;
  &:before {
    content: '';
    display: block;
    padding-top: 100%;
    float: left;
  }
  border: 1px solid black;
`;

const Board = ({ socket, user, player, game, updateGame }) => {
  const { state, dimensions } = game;
  const [xDim, yDim] = dimensions;
  const playerId = game[player];
  const isPlayer = user.id === playerId;
  const isHost = user.id === game['host'];
  const board = game.boards[playerId];

  const [hover, setHover] = useState([]);
  const [ship, setShip] = useState(null);
  const [grid, setGrid] = useState(times(xDim, times(yDim, {})));

  useEffect(
    () => {
      const shipLookup = ((board || {}).ships || []).reduce(
        (obj, ship) =>
          times(ship.length).reduce(
            (obj, _, i) => ({ ...obj, [`${ship.x + i}.${ship.y}`]: ship.id }),
            obj
          ),
        {}
      );
      setGrid(
        times(xDim).map((_, x) =>
          times(yDim).map((_, y) => ({
            ship: shipLookup[`${x}.${y}`]
          }))
        )
      );
    },
    [board]
  );

  const playerLabel = isPlayer
    ? 'you'
    : game[`${player}Name`] ||
      (isHost ? '...' : <JoinButton gameId={game.id} />);

  const getSquareColor = (x, y) => {
    if (
      state === gameState.setup &&
      ship &&
      x >= hover[0] &&
      x < hover[0] + ship.length &&
      hover[1] === y
    ) {
      return hover[0] + ship.length > xDim || grid[x][y].ship ? 'red' : 'green';
    }
    if (grid[x][y].ship) {
      return 'grey';
    }
    return null;
  };

  const onSquareClick = (x, y) => {
    if (!isPlayer) return;
    if (state === gameState.setup && ship && hover[0] + ship.length <= xDim) {
      const { id, length } = ship;
      const content = { x, y, rotation: 'h', id, length };
      setShip(null);
      updateGame({
        boards: { [player]: { ships: x => [...(x || []), content] } }
      });
      socket.emit('client::gameEvent', {
        gameId: game.id,
        type: gameEvent.placeShip,
        content
      });
    }
  };

  return (
    <Div textAlign="center">
      <Div lineHeight="35px">{playerLabel}</Div>
      <Div buffer>
        {times(yDim).map((_, y) => (
          <Flex key={y}>
            {times(xDim).map((_, x) => (
              <BoardSquare
                key={x}
                bg={getSquareColor(x, y)}
                onClick={() => onSquareClick(x, y)}
                onMouseOver={() => isPlayer && setHover([x, y])}
              />
            ))}
          </Flex>
        ))}
      </Div>
      <Div buffer>
        <Ships {...{ state, isPlayer, ship, setShip, board }} />
      </Div>
    </Div>
  );
};

export default withSocket(Board);
