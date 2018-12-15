import React from 'react';

const withBoardProps = Component => props => {
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

export default withBoardProps;
