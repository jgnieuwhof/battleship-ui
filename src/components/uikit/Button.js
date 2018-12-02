import React from 'react';

import { applyDefaultStyles } from './util';

const StyledButton = applyDefaultStyles('button');

const Button = ({ disabled, ...x }) => (
  <StyledButton
    {...x}
    {...{ disabled }}
    p={2}
    bg="primary"
    fontSize={2}
    fontWeight="bold"
    border={0}
    borderRadius={4}
    {...!disabled && { cursor: 'pointer' }}
  />
);

export default Button;
