import React from 'react';
import ReactModal from 'react-modal';
import styled from '@emotion/styled';

import { Button, Div, Flex } from './uikit';
import { withModal } from './context/ModalContext';

const StyledTitle = styled(Div)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.light};
`;
export const Title = ({ children }) => (
  <StyledTitle p={3} fontSize={3} fontWeight="bold">
    {children}
  </StyledTitle>
);

export const Content = ({ children }) => <Div p={3}>{children}</Div>;

const FooterBase = ({ closeModal, enabled, onSubmit }) => (
  <Div p={3}>
    <Button
      disabled={!enabled}
      onClick={() => {
        if (enabled) {
          onSubmit();
          closeModal();
        }
      }}
    >
      submit
    </Button>
  </Div>
);
export const Footer = withModal(FooterBase);

const Modal = ({ modal, closeModal, ...props }) => (
  <ReactModal
    style={{
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        minWidth: '40%',
        maxWidth: '800px',
        transform: 'translate(-50%, -50%)',
        padding: '0px'
      }
    }}
    contentLabel="Example Modal"
    ariaHideApp={false}
    isOpen={!!modal}
    shouldCloseOnOverlayClick={true}
    onRequestClose={closeModal}
    {...props}
  >
    {modal && (
      <Flex flexDirection="column" textAlign="center">
        {modal}
      </Flex>
    )}
  </ReactModal>
);

export default withModal(Modal);
