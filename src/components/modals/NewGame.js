import React, { useState } from 'react';
import { withRouter } from 'react-router';

import { withSocket } from 'components/context/SocketContext';
import { Div, Input } from 'components/uikit';
import { Title, Content, Footer } from 'components/Modal';

const NewGame = ({ history, socket }) => {
  const [dimensions, setDimensions] = useState([20, 20]);

  const valid = [dimensions.every(Boolean)].every(Boolean);

  return (
    <>
      <Title>new game</Title>
      <Content>
        <Div>
          board size:{' '}
          <Input
            tiny
            maxLength={2}
            inputMask={/[^\d]/g}
            value={dimensions[0]}
            onChange={({ value }) => setDimensions([+value, +value])}
          />
        </Div>
      </Content>
      <Footer
        enabled={valid}
        onSubmit={() => {
          socket.emit(
            'client::newGame',
            {
              dimensions
            },
            ({ id }) => history.push(`/games/${id}`)
          );
        }}
      />
    </>
  );
};

export default withSocket(withRouter(NewGame));
