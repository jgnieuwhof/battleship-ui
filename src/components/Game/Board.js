import React, { useState } from 'react';
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

const Board = ({ socket, user, player, game }) => {
  const { state, dimensions } = game;
  const [xDim, yDim] = dimensions;
  const isPlayer = user.id === game[player];
  const isHost = user.id === game['host'];

  const [hover, setHover] = useState([]);
  const [ship, setShip] = useState(null);

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
      return hover[0] + ship.length > xDim ? 'red' : 'green';
    }
    return null;
  };

  const onSquareClick = (x, y) => {
    if (!isPlayer) return;
    if (state === gameState.setup && ship && hover[0] + ship.length <= xDim) {
      socket.emit('client::gameEvent', {
        gameId: game.id,
        type: gameEvent.placeShip,
        content: { ship, x, y, rotation: 'h' }
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
        <Ships {...{ state, isPlayer, ship, setShip }} />
      </Div>
    </Div>
  );
};

export default withSocket(Board);
