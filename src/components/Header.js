import React from 'react';

import { Div, Flex } from './uikit';

const Header = ({ currentUser: { name, id } }) => (
  <Flex p={3} justifyContent="space-between">
    <Div>
      {name} ({id})
    </Div>
    <Div>New Game</Div>
  </Flex>
);

export default Header;
