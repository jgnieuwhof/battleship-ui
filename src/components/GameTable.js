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
  return (
    <StyledBoardSquare>
      ({x},{y})
    </StyledBoardSquare>
  );
};

const Board = ({ xDim, yDim }) => {
  return (
    <Div flexGrow={1}>
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
    <Flex flexGrow={1} flexDirection={yDim > xDim ? 'row' : 'column'}>
      {dimensions && (
        <>
          <Board {...{ xDim, yDim }} />
          <Board {...{ xDim, yDim }} />
        </>
      )}
    </Flex>
  );
};

export default GameTable;
