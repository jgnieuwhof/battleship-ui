import React from 'react';

import { Div } from './uikit';

const Game = ({ user, game }) => (
  <Div>
    {!game ? (
      <Div>Select a game from the sidebar</Div>
    ) : (
      <>
        <Div>Id: {game.id}</Div>
        <Div>Host: {user.id === game.host ? 'you' : game.hostName}</Div>
        <Div>{!game.opponent && 'not started yet'}</Div>
      </>
    )}
  </Div>
);

export default Game;
