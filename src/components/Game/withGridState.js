import React, { useEffect, useState } from 'react';

import { times } from 'util/array';

const withGridState = Component => props => {
  const { xDim, yDim, board } = props;
  const [grid, setGrid] = useState(times(xDim, times(yDim, {})));

  useEffect(
    () => {
      const shipLookup = ((board || {}).ships || []).reduce(
        (obj, ship) =>
          times(ship.length).reduce((obj, _, i) => {
            const xLoc = ship.x + (ship.rotation === 'h' ? i : 0);
            const yLoc = ship.y + (ship.rotation === 'v' ? i : 0);
            return { ...obj, [`${xLoc}.${yLoc}`]: ship.id };
          }, obj),
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

  return <Component {...props} {...{ grid }} />;
};

export default withGridState;
