import { gameStates } from 'common/constants';
import { times } from 'util/array';

const displayStates = {
  [gameStates.matchmaking]: 'waiting for opponent...',
  [gameStates.setup]: 'placing ships...',
  [gameStates.playing]: 'playing...',
  [gameStates.done]: 'done...'
};

export const displayState = state => {
  return displayStates[state] || state;
};

export const isShipOnSquare = ({ x, y, rotation, location: [oX, oY], ship }) =>
  rotation === 'h'
    ? x >= oX && x < oX + ship.length && oY === y
    : y >= oY && y < oY + ship.length && oX === x;

export const isOutOfBounds = ({
  location: [x, y],
  rotation,
  ship,
  dimensions: [xDim, yDim]
}) =>
  (rotation === 'h' ? x : y) + ship.length > (rotation === 'h' ? xDim : yDim);

export const collidesWithShip = ({ location: [x, y], rotation, ship, grid }) =>
  times(ship.length).some((_, i) => {
    const row = grid[rotation === 'h' ? x + i : x] || [];
    const cell = row[rotation === 'h' ? y : y + i];
    return (cell || {}).ship;
  });

export const isValidPlacement = props =>
  [collidesWithShip, isOutOfBounds].every(x => !x(props));
