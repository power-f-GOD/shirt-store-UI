import {
  DetailedHTMLProps,
  HTMLAttributes,
  BlockquoteHTMLAttributes,
  FC,
  Ref,
  CSSProperties,
  FormHTMLAttributes,
  LabelHTMLAttributes,
  MutableRefObject
} from 'react';

export interface APIBaseResponse<T> {
  message?: string;
  data?: T;
  error?: string;
  statusCode: number;
  extra?: any;
}

export interface ActionProps<T> {
  type: string;
  payload?: T;
}

export interface FetchProps<
  Data,
  Extra extends Record<string, any> = Record<string, any>
> extends HttpStatusProps {
  data?: Data;
  extra?: Extra;
}

export interface HttpStatusProps {
  status?: 'inert' | 'pending' | 'fulfilled';
  err?: boolean;
  message?: string;
}

export interface SkeletonProps {
  type?: 'circle' | 'box';
  variant?: 'grey' | 'white';
  count?: string | number;
  className?: string;
  height?: string;
  width?: string;
  borderRadius?: string;
  size?: string;
  erred?: boolean;
  style?: CSSProperties;
  delayBeforeShowLoading?: number;
}

export type TextProps = Partial<{
  className: string;
  style: CSSProperties;
  background: CSSProperties['background'];
  alignSelf: CSSProperties['alignSelf'];
  display: CSSProperties['display'];
  height: CSSProperties['height'];
  width: CSSProperties['width'];
  color: CSSProperties['color'];
  fontSize: CSSProperties['fontSize'];
  fontWeight: CSSProperties['fontWeight'];
  fontStyle: CSSProperties['fontStyle'];
  overflow: CSSProperties['overflow'];
  overflowEllipsis: boolean;
  overflowX: CSSProperties['overflowX'];
  overflowY: CSSProperties['overflowY'];
  textAlign: CSSProperties['textAlign'];
  textTransform: CSSProperties['textTransform'];
  title?: string;
  component: ViewProps['component'];
  children: ViewProps['children'];
}> &
  Pick<HTMLAttributes<any>, 'role' | 'dangerouslySetInnerHTML'> & {
    ref?: MutableRefObject<HTMLElement | null>;
    as?:
      | 'em'
      | 'strong'
      | 'address'
      | 'h1'
      | 'h2'
      | 'h3'
      | 'h4'
      | 'h5'
      | 'h6'
      | 'span'
      | 'p'
      | 'i'
      | 'small'
      | 'blockquote';
  };

export type StackProps = Partial<{
  className: string;
  wrapperClassName: string;
  style: CSSProperties;
  defaultValue?: string | number;
  name?: string;
  gap: CSSProperties['gap'];
  columnGap: CSSProperties['columnGap'];
  rowGap: CSSProperties['rowGap'];
  distribute: CSSProperties['justifyContent'];
  direction: CSSProperties['flexDirection'];
  align: CSSProperties['alignContent'];
  display: 'flex' | 'grid';
  column: CSSProperties['gridColumn'];
  templateColumns: CSSProperties['gridTemplateColumns'];
  row: CSSProperties['gridRow'];
  templateRows: CSSProperties['gridTemplateRows'];
  height: CSSProperties['height'];
  width: CSSProperties['width'];
  padding: CSSProperties['padding'];
  background: CSSProperties['background'];
  border: CSSProperties['border'];
  borderRadius: CSSProperties['borderRadius'];
  zIndex: CSSProperties['zIndex'];
  position: CSSProperties['position'];
  top: CSSProperties['top'];
  right: CSSProperties['right'];
  bottom: CSSProperties['bottom'];
  left: CSSProperties['left'];
  fontSize: CSSProperties['fontSize'];
  overflow: CSSProperties['overflow'];
  boxShadow: CSSProperties['boxShadow'];
  maxHeight: CSSProperties['maxHeight'];
  minHeight: CSSProperties['minHeight'];
  overflowX: CSSProperties['overflowX'];
  overflowY: CSSProperties['overflowY'];
  borderBottom: CSSProperties['borderBottom'];
  borderLeft: CSSProperties['borderLeft'];
  opacity: CSSProperties['opacity'];
  color: CSSProperties['color'];
  animationDelay: CSSProperties['animationDelay'];
  animationTimingFunction: CSSProperties['animationTimingFunction'];
  component: ViewProps['component'];
  children: ViewProps['children'];
}> &
  Pick<LabelHTMLAttributes<any>, 'htmlFor'> &
  Pick<HTMLAttributes<any>, 'role'> &
  Pick<
    FormHTMLAttributes<any>,
    'onSubmit' | 'noValidate' | 'onChange' | 'onTransitionEnd'
  > & {
    ref?: MutableRefObject<HTMLElement | null>;
  } & Pick<ViewProps, 'as' | 'dynamic'>;

export interface ViewProps
  extends Partial<
    DetailedHTMLProps<
      HTMLAttributes<HTMLElement> & BlockquoteHTMLAttributes<HTMLElement>,
      HTMLElement &
        HTMLParagraphElement &
        HTMLOListElement &
        HTMLUListElement &
        HTMLLIElement
    >
  > {
  as?: ViewAs;
  slot?: string;
  component?: FC<any>;
  ref?: Ref<any>;
  dynamic?: boolean;
}

export type ViewAs =
  | 'hr'
  | 'form'
  | 'br'
  | 'label'
  | 'em'
  | 'strong'
  | 'address'
  | 'nav'
  | 'header'
  | 'main'
  | 'aside'
  | 'footer'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'div'
  | 'span'
  | 'p'
  | 'ul'
  | 'ol'
  | 'li'
  | 'section'
  | 'i'
  | 'small'
  | 'blockquote';
