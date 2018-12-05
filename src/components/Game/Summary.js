import React from 'react';

import { Div } from 'components/uikit';

const displayState = state => {
  const displayStates = {
    matchmaking: 'waiting for opponent...',
    setup: 'placing ships...'
  };
  return displayStates[state] || state;
};

const Summary = ({ gameId, game }) => {
  return (
    <Div textAlign="center">
      {!gameId ? (
        <Div>Select a game from the sidebar</Div>
      ) : !game.id ? (
        <Div>Game "{gameId}" not found</Div>
      ) : (
        <>
          <Div>{gameId}</Div>
          <Div buffer>{displayState(game.state)}</Div>
        </>
      )}
    </Div>
  );
};

export default Summary;
