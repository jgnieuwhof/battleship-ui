import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { withRouter } from 'react-router';

import { displayState } from 'util/game';
import { withSocket } from 'components/context/SocketContext';
import { Div } from 'components/uikit';

const StyledSidebar = styled(Div)`
  width: 200px;
  height: 100%;
  overflow-y: scroll;
`;

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
    <StyledSidebar p={3}>
      {Object.keys(games).map((id, i) => {
        return (
          <Div
            key={id}
            buffer={i > 0}
            onClick={() => history.push(`/games/${id}`)}
          >
            <Div>
              {id === gameId ? '* ' : ''}
              {displayState(games[id].state)}
            </Div>
            <Div>
              {games[id].hostName} vs. {games[id].opponentName || '?'}
            </Div>
          </Div>
        );
      })}
    </StyledSidebar>
  );
};
export default withSocket(withRouter(Sidebar));
