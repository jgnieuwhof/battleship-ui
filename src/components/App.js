import React, { useEffect, useState } from 'react';
import store from 'store';
import { Switch, withRouter, Route } from 'react-router';

import { withSocket } from './context/SocketContext';
import { withModal } from './context/ModalContext';

import { Flex } from './uikit';
import RegisterUser from './RegisterUser';
import Header from './Header';
import Sidebar from './Sidebar';
import Game from './Game';
import Modal from './Modal';

import './App.css';

const Games = ({
  match: {
    params: { gameId }
  },
  history,
  user,
  games
}) => {
  return (
    <Flex>
      <Sidebar
        {...{ user, gameId, games }}
        setGame={id => history.push(`/games/${id}`)}
      />
      <Game {...{ user, gameId }} />
    </Flex>
  );
};

const App = ({ socket, history, location, match }) => {
  const [user, setUser] = useState({});
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
        if (!location.pathname.startsWith('/games')) history.push('/games');
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
            <Switch>
              <Route
                exact
                path="/games/:gameId?"
                render={x => <Games {...x} {...{ user, games }} />}
              />
            </Switch>
          </>
        ) : (
          <Flex
            minHeight={0}
            flexGrow={1}
            alignItems="center"
            justifyContent="center"
          >
            <RegisterUser
              setUser={x => {
                history.push('/games');
                updateUser({ registered: true, ...x });
              }}
            />
          </Flex>
        )}
      </Flex>
      <Modal />
    </div>
  );
};

export default withModal(withSocket(withRouter(App)));
