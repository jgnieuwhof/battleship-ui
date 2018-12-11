import React from 'react';

import { gameState } from 'common/constants';
import { Div } from 'components/uikit';

const ships = [
  { id: 0, name: 'carrier', length: 5 },
  { id: 1, name: 'battleship', length: 4 },
  { id: 2, name: 'cruiser', length: 3 },
  { id: 3, name: 'submarine', length: 3 },
  { id: 4, name: 'destroyer', length: 2 }
];

const Ships = ({ state, isPlayer, ship, setShip }) => {
  return (
    <Div>
      {ships.map(x => {
        const isPlacing = (ship || {}).id === x.id;
        return (
          <Div
            buffer
            key={x.id}
            onClick={() =>
              isPlayer &&
              gameState.setup === state &&
              setShip(isPlacing ? null : x)
            }
            color={isPlacing ? 'green' : 'default'}
          >
            {x.name} ({x.length})
          </Div>
        );
      })}
    </Div>
  );
};

export default Ships;
