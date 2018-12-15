import React, { useEffect, useState } from 'react';

import { times } from 'util/array';

const lookupKey = (x, y) => `${x}.${y}`;

const withGridState = Component => props => {
  const { xDim, yDim, board, game } = props;
  const [grid, setGrid] = useState(times(xDim, times(yDim, {})));

  useEffect(
    () => {
      const _board = board || {};
      const shipLookup = (_board.ships || []).reduce(
        (obj, ship) =>
          times(ship.length).reduce((obj, _, i) => {
            const xLoc = ship.x + (ship.rotation === 'h' ? i : 0);
            const yLoc = ship.y + (ship.rotation === 'v' ? i : 0);
            return { ...obj, [lookupKey(xLoc, yLoc)]: ship.id };
          }, obj),
        {}
      );
      const guessLookup = (_board.guesses || []).reduce(
        (obj, { x, y, isHit }) => ({
          ...obj,
          [lookupKey(x, y)]: isHit ? 'h' : 'm'
        }),
        {}
      );
      setGrid(
        times(xDim).map((_, x) =>
          times(yDim).map((_, y) => {
            const key = lookupKey(x, y);
            return {
              ship: shipLookup[key],
              guess: !!guessLookup[key],
              hit: guessLookup[key] === 'h'
            };
          })
        )
      );
    },
    [game.id, board]
  );

  return <Component {...props} {...{ grid }} />;
};

export default withGridState;
