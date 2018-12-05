import React, { useEffect, useState } from 'react';
import { withTheme } from 'emotion-theming';

import { applyDefaultStyles } from './util';

const StyledInput = applyDefaultStyles('input');

const Input = ({
  value: _value,
  onChange = () => {},
  onKeyUp = () => {},
  onSubmit = () => {},
  inputMask,
  tiny,
  large,
  center,
  theme: { space },
  ...props
}) => {
  const [value, setValue] = useState('');
  useEffect(
    () => {
      _value && setValue(_value);
    },
    [_value]
  );
  return (
    <StyledInput
      p={large ? 2 : 1}
      {...tiny && { width: space[4] }}
      textAlign={tiny || center ? 'center' : 'left'}
      fontSize={large ? 4 : 1}
      fontWeight={large ? 'bold' : 'normal'}
      border="1px solid black"
      borderRadius={100}
      onChange={({ target: { value } }) => {
        setValue(value.replace(inputMask || '', ''));
        onChange({ value });
      }}
      onKeyUp={({ keyCode, target: { value } }) => {
        keyCode === 13 && onSubmit({ value });
        onKeyUp({ keyCode, value });
      }}
      {...{ value }}
      {...props}
    />
  );
};

export default withTheme(Input);
