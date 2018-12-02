import React from 'react';

import { Input } from './uikit';

const RegisterUser = ({ setUser }) => {
  return (
    <Input
      large
      center
      maxLength={20}
      placeholder="pick a username"
      inputMask={/[^\w]/g}
      onSubmit={x => setUser({ name: x.value })}
    />
  );
};

export default RegisterUser;
