import React from 'react';

import { applyDefaultStyles } from './util';

const StyledInput = applyDefaultStyles('input');

const Input = ({ large, center, ...props }) => (
  <StyledInput
    p={large ? 2 : 1}
    textAlign={center ? 'center' : 'left'}
    fontSize={large ? 4 : 1}
    fontWeight={large ? 'bold' : 'normal'}
    border="1px solid black"
    borderRadius={100}
    {...props}
  />
);

export default Input;
