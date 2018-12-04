import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { withRouter } from 'react-router';

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
    <StyledSidebar pl={3} pr={3}>
      {Object.keys(games).map(id => {
        return (
          <Div key={id} buffer onClick={() => history.push(`/games/${id}`)}>
            <Div>
              {id === gameId ? '* ' : ''}
              {games[id].opponent ? 'in progress' : 'new game'}
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
