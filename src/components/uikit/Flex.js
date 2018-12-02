import styled from '@emotion/styled';
import {
  alignItems,
  alignContent,
  justifyContent,
  flexWrap,
  flexDirection,
  flex,
  flexBasis,
  order
} from 'styled-system';

import Div from './Div';

const Flex = styled(Div)`
  ${alignItems}
  ${alignContent}
  ${justifyContent}
  ${flexWrap}
  ${flexDirection}
  ${flex}
  ${flexBasis}
  ${order}

  display: flex;
`;

export default Flex;
