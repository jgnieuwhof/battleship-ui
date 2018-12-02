import React from 'react';
import ReactModal from 'react-modal';
import styled from '@emotion/styled';

import { Button, Div, Flex } from './uikit';

const StyledTitle = styled(Div)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.light};
`;
export const Title = ({ children }) => (
  <StyledTitle p={3} fontSize={3} fontWeight="bold">
    {children}
  </StyledTitle>
);

export const Content = ({ children }) => <Div p={3}>{children}</Div>;

export const Footer = ({ onSubmit }) => (
  <Div p={3}>
    <Button onClick={onSubmit}>Submit</Button>
  </Div>
);

const Modal = ({ Component, ...props }) => (
  <ReactModal
    style={{
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px'
      }
    }}
    contentLabel="Example Modal"
    ariaHideApp={false}
    isOpen={!!Component}
    {...props}
  >
    {Component && (
      <Flex flexDirection="column" textAlign="center">
        {Component}
      </Flex>
    )}
  </ReactModal>
);

export default Modal;
