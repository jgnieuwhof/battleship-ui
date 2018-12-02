import React, { useEffect, useState } from 'react';
import store from 'store';

import { withSocket } from './context/SocketContext';
import { withModal } from './context/ModalContext';

import { Flex } from './uikit';
import RegisterUser from './RegisterUser';
import Header from './Header';
import Sidebar from './Sidebar';
import Game from './Game';
import Modal from './Modal';

import './App.css';

const App = ({ socket }) => {
  const [user, setUser] = useState({});
  const [game, setGame] = useState(null);
  const [games, setGames] = useState({});

  const updateUser = update => {
    socket.emit('client::updateUser', update, user => {
      setUser(user);
      store.set('user', user);
    });
  };

  useEffect(() => {
    if (!user.id) {
      socket.emit('client::init', store.get('user'), ({ user, games }) => {
        setUser(user);
        setGames(games);
      });
    }
  });

  useEffect(
    () => {
      socket.on('server::games', setGames);
    },
    [socket]
  );

  return (
    <div>
      <Flex bg="dark" minHeight="100vh" flexDirection="column" color="light">
        {user.registered ? (
          <>
            <Header {...{ user }} />
            <Flex>
              <Sidebar {...{ user, game, setGame, games }} />
              <Game {...{ user }} game={games[game]} />
            </Flex>
          </>
        ) : (
          <Flex
            minHeight={0}
            flexGrow={1}
            alignItems="center"
            justifyContent="center"
          >
            <RegisterUser
              setUser={x => updateUser({ registered: true, ...x })}
            />
          </Flex>
        )}
      </Flex>
      <Modal />
    </div>
  );
};

export default withModal(withSocket(App));
