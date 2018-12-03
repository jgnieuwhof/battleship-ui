import React from 'react';

import { Div } from 'components/uikit';

const Sidebar = ({ games, user, gameId, setGame }) => (
  <Div width={200} pl={3} pr={3}>
    {Object.keys(games).map(id => {
      return (
        <Div key={id} buffer onClick={() => setGame(id)}>
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
  </Div>
);

export default Sidebar;
