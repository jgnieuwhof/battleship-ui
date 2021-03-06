import React, { useEffect, useState } from 'react';
import store from 'store';
import { Switch, withRouter, Route } from 'react-router';

import { withSocket } from 'components/context/SocketContext';
import { withModal } from 'components/context/ModalContext';

import { Flex } from 'components/uikit';
import RegisterUser from 'components/RegisterUser';
import Header from 'components/Header';
import Modal from 'components/Modal';
import Dashboard from 'components/Dashboard';

import 'components/App.css';

const App = ({ socket, history, location, match }) => {
  const [user, _setUser] = useState({});

  const setUser = x => {
    _setUser(x);
    store.set('user', x);
  };

  const updateUser = update => {
    socket.emit('client::updateUser', update, setUser);
  };

  useEffect(() => {
    const lsUser = store.get('user');
    if (!user.id && lsUser) {
      socket.emit('client::userInit', lsUser, user => {
        setUser(user);
        if (!location.pathname.startsWith('/games')) history.push('/games');
      });
    }
  });

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
                render={x => <Dashboard {...x} {...{ user }} />}
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
