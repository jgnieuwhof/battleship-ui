import React, { useEffect, useState } from 'react';
import store from 'store';

import { withSocket } from './context/SocketContext';

import { Flex } from './uikit';
import RegisterUser from './RegisterUser';
import Header from './Header';
import Sidebar from './Sidebar';
import Game from './Game';

import './App.css';

const App = ({ socket }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [currentGame, setCurrentGame] = useState(null);

  const updateUser = update => {
    socket.emit('client::updateUser', update, user => {
      setCurrentUser(user);
      store.set('user', user);
    });
  };

  useEffect(() => {
    if (!currentUser.id) {
      socket.emit('client::init', null, user => {
        setCurrentUser(user);
        if (store.get('user')) updateUser(store.get('user'));
      });
    }
  });

  return (
    <Flex bg="dark" minHeight="100vh" flexDirection="column" color="light">
      {currentUser.name ? (
        <>
          <Header {...{ currentUser }} />
          <Flex>
            <Sidebar {...{ currentUser, currentGame, setCurrentGame }} />
            <Game {...{ currentUser, currentGame }} />
          </Flex>
        </>
      ) : (
        <Flex
          minHeight={0}
          flexGrow={1}
          alignItems="center"
          justifyContent="center"
        >
          <RegisterUser setUsername={name => updateUser({ name })} />
        </Flex>
      )}
    </Flex>
  );
};

export default withSocket(App);
