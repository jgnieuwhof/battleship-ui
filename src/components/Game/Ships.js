import React from 'react';

import { gameState } from 'common/constants';
import { Div } from 'components/uikit';

const ships = [
  { id: 1, name: 'carrier', length: 5 },
  { id: 2, name: 'battleship', length: 4 },
  { id: 3, name: 'cruiser', length: 3 },
  { id: 4, name: 'submarine', length: 3 },
  { id: 5, name: 'destroyer', length: 2 }
];

const Ships = ({ board, state, isPlayer, ship, setShip }) => {
  return (
    <Div>
      {ships.map(x => {
        const isPlacing = (ship || {}).id === x.id;
        const hasBeenPlaced = ((board || {}).ships || []).some(
          s => s.id === x.id
        );
        const canBePlaced =
          isPlayer && gameState.setup === state && !hasBeenPlaced;
        return (
          <Div
            buffer
            key={x.id}
            onClick={() => canBePlaced && setShip(isPlacing ? null : x)}
            color={isPlacing ? 'green' : 'default'}
            cursor={canBePlaced ? 'pointer' : 'default'}
          >
            {x.name} ({x.length})
          </Div>
        );
      })}
    </Div>
  );
};

export default Ships;
