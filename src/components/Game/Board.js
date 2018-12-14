import React, { useState } from 'react';
import styled from '@emotion/styled';

import { gameEvent, gameState } from 'common/constants';
import { times } from 'util/array';
import { withSocket } from 'components/context/SocketContext';
import HotkeyProvider from 'components/providers/HotkeyProvider';
import { Div, Flex } from 'components/uikit';

import JoinButton from './JoinButton';
import Ships from './Ships';
import withGridState from './withGridState';

const isOutOfBounds = ({
  location: [x, y],
  rotation,
  ship,
  dimensions: [xDim, yDim]
}) =>
  (rotation === 'h' ? x : y) + ship.length > (rotation === 'h' ? xDim : yDim);

const collidesWithShip = ({ location: [x, y], rotation, ship, grid }) =>
  times(ship.length).some((_, i) => {
    const row = grid[rotation === 'h' ? x + i : x] || [];
    const cell = row[rotation === 'h' ? y : y + i];
    return (cell || {}).ship;
  });

const isValidPlacement = props =>
  [collidesWithShip, isOutOfBounds].every(x => !x(props));

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

const boardProps = Component => props => {
  const { user, game, player } = props;
  const { dimensions } = game;
  const [xDim, yDim] = dimensions;
  const playerId = game[player];
  const isPlayer = user.id === playerId;
  const isHost = user.id === game['host'];
  const board = game.boards[playerId];
  return (
    <Component
      {...{ dimensions, xDim, yDim, playerId, isPlayer, isHost, board }}
      {...props}
    />
  );
};

const Board = ({
  player, // native ...
  user,
  game,
  updateGame,
  socket, // withSocket
  xDim, //boardProps ...
  yDim,
  dimensions,
  playerId,
  isPlayer,
  isHost,
  board,
  grid // withGridState
}) => {
  const { state } = game;

  const [hover, setHover] = useState([]);
  const [ship, setShip] = useState(null);
  const [rotation, setRotation] = useState('h');

  const playerLabel = isPlayer
    ? 'you'
    : game[`${player}Name`] ||
      (isHost ? '...' : <JoinButton gameId={game.id} />);

  const getSquareColor = (x, y) => {
    if (
      state === gameState.setup &&
      ship &&
      (rotation === 'h'
        ? x >= hover[0] && x < hover[0] + ship.length && hover[1] === y
        : y >= hover[1] && y < hover[1] + ship.length && hover[0] === x)
    ) {
      return isOutOfBounds({ rotation, location: hover, ship, dimensions }) ||
        grid[x][y].ship
        ? 'red'
        : 'green';
    }
    if (grid[x][y].ship) {
      return 'grey';
    }
    return null;
  };

  const onSquareClick = (x, y) => {
    if (!isPlayer) return;
    if (
      state === gameState.setup &&
      ship &&
      isValidPlacement({ rotation, location: hover, ship, dimensions, grid })
    ) {
      const { id, length } = ship;
      const content = { x, y, rotation, id, length };
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

  const onKeyUp = ({ keyCode }) => {
    switch (keyCode) {
      case 82:
        setRotation(rotation === 'h' ? 'v' : 'h');
        break;
      default:
        break;
    }
  };

  return (
    <HotkeyProvider onKeyUp={isPlayer ? onKeyUp : () => {}}>
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
    </HotkeyProvider>
  );
};

export default withSocket(boardProps(withGridState(Board)));
