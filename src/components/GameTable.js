import React from 'react';
import styled from '@emotion/styled';

import { Div, Flex } from 'components/uikit';
import { times } from 'util/array';

const StyledBoardSquare = styled(Div)`
  flex: 1 0 0px;
  &:before {
    content: '';
    display: block;
    padding-top: 100%;
    float: left;
  }
  border: 1px solid black;
`;
const BoardSquare = ({ x, y, xDim, yDim }) => {
  return <StyledBoardSquare />;
};

const Board = ({ xDim, yDim }) => {
  console.log('draw board');
  return (
    <Div>
      {times(yDim).map((_, y) => (
        <Flex key={y}>
          {times(xDim).map((_, x) => (
            <BoardSquare key={x} {...{ x, y, xDim, yDim }} />
          ))}
        </Flex>
      ))}
    </Div>
  );
};

const GameTable = ({ game }) => {
  const { dimensions } = game;
  const [xDim, yDim] = dimensions || [];
  return (
    <Flex flexGrow={1} flexDirection="row" justifyContent="space-around">
      {dimensions && (
        <>
          <Div flexGrow={1} mr={3}>
            <Board {...{ xDim, yDim }} />
          </Div>
          <Div flexGrow={1}>
            <Board {...{ xDim, yDim }} />
          </Div>
        </>
      )}
    </Flex>
  );
};

export default GameTable;
