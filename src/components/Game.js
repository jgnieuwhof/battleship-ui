import React, { useEffect, useState } from 'react';

import { withSocket } from 'components/context/SocketContext';
import { Button, Div } from 'components/uikit';

const Game = ({ user, gameId, socket }) => {
  const [game, setGame] = useState({});

  const isHost = user.id === game.host;
  const isOpponent = user.id === game.opponent;

  useEffect(
    () => {
      socket.on('server::game', x => setGame(x || {}));
      socket.emit('client::joinRoom', { gameId }, x => setGame(x || {}));
    },
    [gameId]
  );

  return (
    <Div flexGrow={1}>
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
                <Button
                  onClick={() => socket.emit('client::acceptGame', { gameId })}
                >
                  join
                </Button>
              )}
            </Div>
          )}
        </>
      )}
    </Div>
  );
};

export default withSocket(Game);
