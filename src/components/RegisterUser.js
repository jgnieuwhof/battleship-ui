import React, { useState } from 'react';

import { Input } from './uikit';

const RegisterUser = ({ setUsername }) => {
  const [userInput, setUserInput] = useState('');
  return (
    <Input
      large
      center
      maxLength={20}
      placeholder="pick a username"
      value={userInput}
      onChange={({ target: { value } }) =>
        setUserInput(value.replace(/[^\w]/g, ''))
      }
      onKeyUp={e => e.keyCode === 13 && setUsername(userInput)}
    />
  );
};

export default RegisterUser;
