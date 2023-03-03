import { memo, forwardRef } from 'react';

import { StackProps } from 'src/types';
import { View } from './View';

const _Stack = forwardRef<HTMLElement, StackProps>(
  (
    {
      children,
      component,
      style,
      className,
      height,
      width,
      align,
      background,
      borderRadius,
      gap,
      color,
      padding,
      direction,
      distribute,
      display,
      zIndex,
      column,
      templateColumns,
      row,
      templateRows,
      columnGap,
      rowGap,
      fontSize,
      opacity,
      overflow,
      overflowY,
      overflowX,
      boxShadow,
      maxHeight,
      minHeight,
      position,
      top,
      right,
      bottom,
      left,
      border,
      borderBottom,
      borderLeft,
      animationDelay,
      animationTimingFunction,
      ...restProps
    },
    ref
  ): JSX.Element => {
    const Component = component || View;

    return (
      <Component
        {...restProps}
        ref={ref}
        className={`Stack flex${
          !className?.includes('flex-row') ? ' flex-col' : ''
        } ${className || ''}`}
        style={{
          alignItems: align,
          width,
          height,
          alignContent: align,
          background,
          borderRadius,
          gap,
          color,
          padding,
          zIndex,
          display,
          flexDirection: direction,
          justifyContent: distribute,
          gridRow: row,
          gridTemplateRows: templateRows,
          gridColumn: column,
          gridTemplateColumns: templateColumns,
          columnGap: columnGap || gap,
          rowGap: rowGap || gap,
          boxShadow,
          fontSize,
          opacity,
          maxHeight,
          minHeight,
          position,
          top,
          right,
          bottom,
          left,
          overflow,
          overflowY,
          overflowX,
          borderBottom: borderBottom || border,
          borderTop: border,
          borderLeft: borderLeft || border,
          borderRight: border,
          animationDelay,
          animationTimingFunction,
          ...(style || {})
        }}>
        {children}
      </Component>
    );
  }
);

_Stack.displayName = '_Stack';

export const Stack = memo(_Stack);
