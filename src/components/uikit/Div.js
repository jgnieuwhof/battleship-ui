import React from 'react';
import { applyDefaultStyles } from './util';

const StyledDiv = applyDefaultStyles('div');

const Div = ({ buffer, ...x }) => <StyledDiv {...buffer && { pt: 3 }} {...x} />;

export default Div;
