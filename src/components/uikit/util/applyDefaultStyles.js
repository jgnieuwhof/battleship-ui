import styled from '@emotion/styled';
import {
  space,
  height,
  minHeight,
  width,
  minWidth,
  border,
  borderRadius,
  fontSize,
  fontWeight,
  color,
  justifySelf,
  alignSelf,
  textAlign
} from 'styled-system';

const styleHelper = (prop, cssProp) => props =>
  props[prop] ? `${cssProp}: ${props[prop]};` : ``;

const applyDefaultStyles = Component => styled(Component)`
  ${space}
  ${height}
  ${minHeight}
  ${width}
  ${minWidth}
  ${border}
  ${borderRadius}

  ${fontSize}
  ${fontWeight}

  ${color}
  ${textAlign}

  ${justifySelf}
  ${alignSelf}

  ${styleHelper('flexGrow', 'flex-grow')}
`;

export default applyDefaultStyles;
