import React, { useEffect, useState } from 'react';
import store from 'store';

import { withSocket } from './context/SocketContext';

import { Flex } from './uikit';
import RegisterUser from './RegisterUser';
import Header from './Header';
import Sidebar from './Sidebar';
import Game from './Game';
import Modal from './Modal';
import { NewGame } from './modals';

import './App.css';

const App = ({ socket }) => {
  const [user, setUser] = useState({});
  const [game, setGame] = useState(null);
  const [modal, setModal] = useState(null);

  const updateUser = update => {
    socket.emit('client::updateUser', update, user => {
      setUser(user);
      store.set('user', user);
    });
  };

  useEffect(() => {
    if (!user.id) {
      socket.emit('client::init', null, user => {
        setUser(user);
        if (store.get('user')) updateUser(store.get('user'));
      });
    }
  });

  return (
    <div>
      <Flex bg="dark" minHeight="100vh" flexDirection="column" color="light">
        {user.name ? (
          <>
            <Header
              {...{ user }}
              onNewGameClick={() => setModal(<NewGame />)}
            />
            <Flex>
              <Sidebar {...{ user, game, setGame }} />
              <Game {...{ user, game }} />
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
      <Modal {...{ Component: modal }} />
    </div>
  );
};

export default withSocket(App);
