import React, { useState } from 'react';
import styled from '@emotion/styled';

import { isValidPlacement, isOutOfBounds, isShipOnSquare } from 'util/game';
import { times } from 'util/array';
import { gameEvents, gameStates } from 'common/constants';

import { withSocket } from 'components/context/SocketContext';
import HotkeyProvider from 'components/providers/HotkeyProvider';
import { Div, Flex } from 'components/uikit';

import JoinButton from './JoinButton';
import Ships from './Ships';
import withGridState from './withGridState';
import withBoardProps from './withBoardProps';

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
  const resetShip = () => {
    setShip(null);
    setRotation('h');
  };
  const [hover, _setHover] = useState([]);

  const setHover = x => () => {
    if (
      (state === gameStates.setup && ship && isPlayer) ||
      (state === gameStates.playing && canPlay)
    )
      _setHover(x);
  };

  const playerLabel = () =>
    isPlayer
      ? 'you'
      : game[`${player}Name`] ||
        (isHost ? '...' : <JoinButton gameId={game.id} />);

  const playerColor = () =>
    state === gameStates.setup ||
    (state === gameStates.playing && turn === playerId)
      ? 'blue'
      : state === gameStates.done && game.winner === playerId
      ? 'gold'
      : 'white';

  const showPlayerBorder = () =>
    state !== gameStates.matchmaking || player === 'host';

  const playerBorder = () =>
    `${showPlayerBorder() ? 1 : 0}px solid ${playerColor()}`;

  const squareColor = (x, y) => {
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

  const onSquareClick = (x, y) => () => {
    if (
      state === gameStates.setup &&
      isPlayer &&
      ship &&
      isValidPlacement({ rotation, location: hover, ship, dimensions, grid })
    ) {
      const { id, length } = ship;
      const content = { x, y, rotation, id, length };
      updateGame({
        boards: { [player]: { ships: x => [...(x || []), content] } }
      });
      resetShip();
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
    if (!isPlayer) return;
    switch (keyCode) {
      case 82:
        if (state === gameStates.setup && ship)
          setRotation(rotation === 'h' ? 'v' : 'h');
        break;
      case 27:
        if (state === gameStates.setup && ship) resetShip();
        break;
      default:
        break;
    }
  };

  return (
    <HotkeyProvider {...{ onKeyUp }}>
      <Div textAlign="center">
        <Div lineHeight="35px" border={playerBorder()}>
          {playerLabel()}
        </Div>
        <Div buffer onMouseOut={setHover([])}>
          {times(yDim).map((_, y) => (
            <Flex key={y}>
              {times(xDim).map((_, x) => (
                <BoardSquare
                  key={x}
                  bg={squareColor(x, y)}
                  onClick={onSquareClick(x, y)}
                  onMouseOver={setHover([x, y])}
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

export default withSocket(withBoardProps(withGridState(Board)));
