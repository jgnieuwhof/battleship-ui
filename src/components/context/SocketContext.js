import React, { createContext } from 'react';

const context = createContext();

export const withSocket = Component => props => (
  <context.Consumer>
    {socket => <Component {...props} {...{ socket }} />}
  </context.Consumer>
);

export default context;
