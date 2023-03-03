import {
  memo,
  createElement,
  forwardRef,
  ForwardRefExoticComponent
} from 'react';
import { ViewProps } from 'src/types';

const _View: ForwardRefExoticComponent<ViewProps> = forwardRef(
  ({ as, children, component, ...props }, ref): JSX.Element | null => {
    const Component = component;

    props.ref = ref;

    if (Component) return <Component {...props}>{children}</Component>;

    return createElement(as || 'div', props, children);
  }
);

_View.displayName = 'View';

export const View = memo(_View);
