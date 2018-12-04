import React, { useState } from 'react';
import { withRouter } from 'react-router';

import { withSocket } from 'components/context/SocketContext';
import { Div, Input } from 'components/uikit';
import { Title, Content, Footer } from 'components/Modal';

const NewGame = ({ history, socket }) => {
  const [numberOfShips, setNumberOfShips] = useState(5);
  const [shotsPerTurn, setShotsPerTurn] = useState(1);
  const [dimensions, setDimensions] = useState([10, 10]);

  const valid = [
    numberOfShips > 0,
    shotsPerTurn > 0,
    dimensions.every(Boolean)
  ].every(Boolean);

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
            onChange={({ value }) => setDimensions([+value, dimensions[1]])}
          />{' '}
          x{' '}
          <Input
            tiny
            maxLength={2}
            inputMask={/[^\d]/g}
            value={dimensions[1]}
            onChange={({ value }) => setDimensions([dimensions[0], +value])}
          />
        </Div>
        <Div buffer>
          shots per turn:{' '}
          <Input
            tiny
            maxLength={1}
            inputMask={/[^\d]/g}
            value={shotsPerTurn}
            onChange={({ value }) => setShotsPerTurn(+value)}
          />
        </Div>
        <Div buffer>
          number of ships:{' '}
          <Input
            tiny
            maxLength={1}
            inputMask={/[^\d]/g}
            value={numberOfShips}
            onChange={({ value }) => setNumberOfShips(+value)}
          />
        </Div>
      </Content>
      <Footer
        enabled={valid}
        onSubmit={() => {
          socket.emit(
            'client::newGame',
            {
              numberOfShips,
              shotsPerTurn,
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
