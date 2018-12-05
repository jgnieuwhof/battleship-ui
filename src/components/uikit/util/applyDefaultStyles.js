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
  textAlign,
  lineHeight
} from 'styled-system';

const styleHelper = (prop, cssProp) => props =>
  props[prop] ? `${cssProp || prop}: ${props[prop]};` : ``;

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
  ${lineHeight}

  ${justifySelf}
  ${alignSelf}

  ${styleHelper('flexGrow', 'flex-grow')}
  ${styleHelper('cursor')}
`;

export default applyDefaultStyles;
