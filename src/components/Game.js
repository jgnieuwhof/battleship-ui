import React, { useEffect, useState } from 'react';

import { withSocket } from 'components/context/SocketContext';
import { Button, Div } from 'components/uikit';

const Game = ({ user, gameId, socket }) => {
  const [game, setGame] = useState({});
  const isHost = user.id === game.host;
  const isOpponent = user.id === game.opponent;
  useEffect(
    () => {
      socket.emit('client::game', { gameId }, x => setGame(x || {}));
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
          <Div>Id: {game.id}</Div>
          <Div>Host: {isHost ? 'you' : game.hostName}</Div>
          {!game.opponent && (
            <Div buffer textAlign="center">
              {isHost ? (
                'waiting for opponent...'
              ) : (
                <Button
                  onClick={e =>
                    socket.emit('client::joinGame', { gameId: game.id })
                  }
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
