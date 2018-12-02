import React, { createContext, useEffect, useState } from 'react';

const context = createContext();

const ModalContext = {
  Provider: ({ value, children }) => {
    const [modal, setModal] = useState(value || null);
    useEffect(
      () => {
        setModal(value);
      },
      [value]
    );
    const closeModal = () => setModal(null);
    return (
      <context.Provider value={{ modal, setModal, closeModal }}>
        {children}
      </context.Provider>
    );
  },
  Consumer: context.Consumer
};

export const withModal = Component => props => (
  <context.Consumer>
    {value => <Component {...props} {...value} />}
  </context.Consumer>
);

export default ModalContext;
