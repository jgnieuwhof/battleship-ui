import React from 'react';

import { applyDefaultStyles } from './util';

const StyledButton = applyDefaultStyles('button');

const Button = x => (
  <StyledButton
    {...x}
    p={2}
    bg="green"
    fontSize={2}
    fontWeight="bold"
    border={0}
    borderRadius={4}
    cursor="pointer"
  />
);

export default Button;
