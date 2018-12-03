import React from 'react';
import { withRouter } from 'react-router';

import Sidebar from 'components/Sidebar';
import Game from 'components/Game';
import { Flex } from 'components/uikit';

const Dashboard = ({
  match: {
    params: { gameId }
  },
  user
}) => {
  return (
    <Flex>
      <Sidebar {...{ user, gameId }} />
      <Game {...{ user, gameId }} />
    </Flex>
  );
};

export default withRouter(Dashboard);
