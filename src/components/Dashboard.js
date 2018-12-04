import React from 'react';
import { withRouter } from 'react-router';
import styled from '@emotion/styled';

import Sidebar from 'components/Sidebar';
import Game from 'components/Game';
import { Flex } from 'components/uikit';

const StyledDashboard = styled(Flex)`
  flex-grow: 1;
  height: calc(100vh - 70px);
`;

const Dashboard = ({
  match: {
    params: { gameId }
  },
  user
}) => {
  return (
    <StyledDashboard>
      <Sidebar {...{ user, gameId }} />
      <Game {...{ user, gameId }} />
    </StyledDashboard>
  );
};

export default withRouter(Dashboard);
