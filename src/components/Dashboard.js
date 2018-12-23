import React from 'react';
import { withRouter } from 'react-router';
import styled from '@emotion/styled';

import Sidebar from 'components/Sidebar';
import Game from 'components/Game';
import { Div, Flex } from 'components/uikit';

const StyledDashboard = styled(Flex)`
  flex-grow: 1;
  height: calc(100vh - 70px);
`;

const SidebarContainer = styled(Div)`
  width: 200px;
  height: 100%;
  overflow-y: scroll;
`;

const Dashboard = ({
  match: {
    params: { gameId }
  },
  user
}) => {
  return (
    <StyledDashboard>
      <SidebarContainer p={3}>
        <Sidebar {...{ user, gameId }} />
      </SidebarContainer>
      <Div p={3} flexGrow={1}>
        <Game {...{ user, gameId }} />
      </Div>
    </StyledDashboard>
  );
};

export default withRouter(Dashboard);
