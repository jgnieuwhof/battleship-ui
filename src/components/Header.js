import React from 'react';

import { Button, Flex } from './uikit';

const Header = ({ user: { name, id }, onNewGameClick }) => (
  <Flex p={3} justifyContent="space-between">
    <Flex alignItems="center">
      {name} ({id})
    </Flex>
    <Button onClick={onNewGameClick}>new game</Button>
  </Flex>
);

export default Header;
