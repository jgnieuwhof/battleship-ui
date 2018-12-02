import React from 'react';

import { withModal } from './context/ModalContext';
import { Button, Flex } from './uikit';
import NewGame from './modals/NewGame';

const Header = ({ setModal, user: { name, id }, onNewGameClick }) => (
  <Flex p={3} justifyContent="space-between">
    <Flex alignItems="center">
      {name} ({id})
    </Flex>
    <Button
      onClick={() => {
        setModal(<NewGame />);
      }}
    >
      new game
    </Button>
  </Flex>
);

export default withModal(Header);
