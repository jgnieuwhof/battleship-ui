import React from 'react';

import { Title, Content, Footer } from '../Modal';

const NewGame = () => (
  <>
    <Title>new game</Title>
    <Content>hey i'm content</Content>
    <Footer onSubmit={() => console.log('hey gurl')} />
  </>
);

export default NewGame;
