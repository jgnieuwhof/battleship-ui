import React, { forwardRef } from 'react';
import { applyDefaultStyles } from './util';

const StyledDiv = applyDefaultStyles('div');

const Div = forwardRef(({ buffer, ...x }, ref) => (
  <StyledDiv {...buffer && { pt: 3 }} {...x} {...{ ref }} />
));

export default Div;
