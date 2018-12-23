import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';

import { displayState } from 'util/game';
import { withSocket } from 'components/context/SocketContext';
import { Div } from 'components/uikit';

const Sidebar = ({ history, user, gameId, setGame, socket }) => {
  const [games, setGames] = useState({});

  useEffect(() => {
    if (!Object.keys(games).length) {
      socket.emit('client::games', null, setGames);
    }
  });

  useEffect(
    () => {
      socket.on('server::games', setGames);
    },
    [socket]
  );

  return (
    <Div>
      {Object.keys(games).map((id, i) => {
        return (
          <Div key={id} buffer={i > 0}>
            <Div
              cursor="pointer"
              onClick={() => history.push(`/games/${id}`)}
              {...id === gameId && { color: 'blue' }}
            >
              <Div>{displayState(games[id].state)}</Div>
              <Div>
                {games[id].hostName} vs. {games[id].opponentName || '?'}
              </Div>
            </Div>
          </Div>
        );
      })}
    </Div>
  );
};
export default withSocket(withRouter(Sidebar));
