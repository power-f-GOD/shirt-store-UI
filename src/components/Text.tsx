import { memo, useMemo, forwardRef } from 'react';

import { TextProps } from 'src/types';
import { View } from './View';

const _Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      as,
      children,
      style,
      className,
      height,
      width,
      background,
      color,
      display,
      fontSize,
      overflow,
      overflowY,
      overflowX,
      alignSelf,
      fontStyle,
      fontWeight,
      overflowEllipsis,
      textAlign,
      textTransform,
      component,
      ...restProps
    },
    ref
  ): JSX.Element => {
    const Component = component || View;
    const styleCheck = JSON.stringify(style || {});

    return (
      <Component
        {...restProps}
        as={as || 'span'}
        ref={ref}
        className={`Text ${className || ''}${
          overflowEllipsis ? ' text-ellipsis' : ''
        }`.trim()}
        style={useMemo(
          () => ({
            alignSelf,
            width,
            height,
            color,
            background,
            display,
            fontSize,
            fontStyle,
            fontWeight,
            overflow,
            overflowY,
            overflowX,
            textAlign,
            textTransform,
            ...(style || {})
          }),
          // eslint-disable-next-line react-hooks/exhaustive-deps
          [
            height,
            width,
            background,
            color,
            display,
            fontSize,
            fontStyle,
            fontWeight,
            overflow,
            overflowX,
            overflowY,
            textAlign,
            textTransform,
            styleCheck
          ]
        )}>
        {children}
      </Component>
    );
  }
);

_Text.displayName = '_Text';

export const Text = memo(_Text);
