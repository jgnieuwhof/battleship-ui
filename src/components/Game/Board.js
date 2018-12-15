import React, { useState } from 'react';
import styled from '@emotion/styled';

import { gameEvents, gameStates } from 'common/constants';
import { times } from 'util/array';
import { withSocket } from 'components/context/SocketContext';
import HotkeyProvider from 'components/providers/HotkeyProvider';
import { Div, Flex } from 'components/uikit';

import JoinButton from './JoinButton';
import Ships from './Ships';
import withGridState from './withGridState';

const isShipOnSquare = ({ x, y, rotation, location: [oX, oY], ship }) =>
  rotation === 'h'
    ? x >= oX && x < oX + ship.length && oY === y
    : y >= oY && y < oY + ship.length && oX === x;

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
  const { turn, dimensions } = game;
  const [xDim, yDim] = dimensions;
  const playerId = game[player];
  const isPlayer = user.id === playerId;
  const isHost = user.id === game['host'];
  const board = game.boards[playerId];
  const canPlay = turn === user.id && user.id !== playerId;
  return (
    <Component
      {...{
        turn,
        canPlay,
        dimensions,
        xDim,
        yDim,
        playerId,
        isPlayer,
        isHost,
        board
      }}
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
  canPlay,
  turn,
  grid // withGridState
}) => {
  const { state } = game;

  const [ship, setShip] = useState(null);
  const [rotation, setRotation] = useState('h');
  const [hover, _setHover] = useState([]);
  const setHover =
    (state === gameStates.setup && ship && isPlayer) ||
    (state === gameStates.playing && canPlay)
      ? _setHover
      : () => {};

  const playerLabel = isPlayer
    ? 'you'
    : game[`${player}Name`] ||
      (isHost ? '...' : <JoinButton gameId={game.id} />);

  const getSquareColor = (x, y) => {
    if (
      state === gameStates.setup &&
      ship &&
      isShipOnSquare({ rotation, x, y, location: hover, ship })
    ) {
      return isOutOfBounds({ rotation, location: hover, ship, dimensions }) ||
        grid[x][y].ship
        ? 'red'
        : 'green';
    }
    if (grid[x] && grid[x][y]) {
      const { hit, guess, ship } = grid[x][y];
      if (hit) return 'red';
      if (guess) return 'white';
      if (ship) return 'grey';
    }
    if (
      state === gameStates.playing &&
      canPlay &&
      hover[0] === x &&
      hover[1] === y
    ) {
      return 'blue';
    }
    return null;
  };

  const onSquareClick = (x, y) => {
    if (
      state === gameStates.setup &&
      isPlayer &&
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
        type: gameEvents.placeShip,
        content
      });
    }
    if (state === gameStates.playing && canPlay && !grid[x][y].guess) {
      updateGame({
        boards: { [player]: { guesses: x => [...(x || []), { x, y }] } }
      });
      socket.emit('client::gameEvent', {
        gameId: game.id,
        type: gameEvents.guess,
        content: { x, y }
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
        <Div
          lineHeight="35px"
          border={`1px solid ${
            state === gameStates.setup ||
            (state === gameStates.playing && turn === playerId)
              ? 'blue'
              : 'white'
          }`}
        >
          {playerLabel}
        </Div>
        <Div buffer onMouseOut={() => setHover([])}>
          {times(yDim).map((_, y) => (
            <Flex key={y}>
              {times(xDim).map((_, x) => (
                <BoardSquare
                  key={x}
                  bg={getSquareColor(x, y)}
                  onClick={() => onSquareClick(x, y)}
                  onMouseOver={() => setHover([x, y])}
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
