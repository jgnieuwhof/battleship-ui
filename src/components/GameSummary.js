import React from 'react';

import { Button, Div } from 'components/uikit';

const GameSummary = ({ user, gameId, game, acceptGame }) => {
  const isHost = user.id === game.host;
  const isOpponent = user.id === game.opponent;
  return (
    <Div>
      {!gameId ? (
        <Div>Select a game from the sidebar</Div>
      ) : !game.id ? (
        <Div>Game "{gameId}" not found</Div>
      ) : (
        <>
          <Div>Id: {gameId}</Div>
          <Div>Host: {isHost ? 'you' : game.hostName}</Div>
          {game.opponent ? (
            <Div>Opponent: {isOpponent ? 'you' : game.opponentName}</Div>
          ) : (
            <Div buffer textAlign="center">
              {isHost ? (
                'waiting for opponent...'
              ) : (
                <Button onClick={acceptGame}>join</Button>
              )}
            </Div>
          )}
        </>
      )}
    </Div>
  );
};

export default GameSummary;
