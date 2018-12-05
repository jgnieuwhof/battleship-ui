import React from 'react';
import styled from '@emotion/styled';

import { times } from 'util/array';
import { Div, Flex } from 'components/uikit';
import JoinButton from './JoinButton';

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

const Board = ({ user, player, game }) => {
  const { dimensions } = game;
  const [xDim, yDim] = dimensions;
  const isPlayer = user.id === game[player];
  const isHost = user.id === game['host'];
  return (
    <Div textAlign="center">
      <Div lineHeight="35px">
        {isPlayer
          ? 'you'
          : game[`${player}Name`] ||
            (isHost ? '...' : <JoinButton gameId={game.id} />)}
      </Div>
      <Div buffer>
        {times(yDim).map((_, y) => (
          <Flex key={y}>
            {times(xDim).map((_, x) => (
              <BoardSquare key={x} />
            ))}
          </Flex>
        ))}
      </Div>
    </Div>
  );
};

export default Board;
