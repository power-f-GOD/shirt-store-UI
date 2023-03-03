import { memo, useCallback, ReactEventHandler, forwardRef } from 'react';
import Image from 'next/image';

const _Img: typeof Image = forwardRef(({ className, ...props }, ref) => {
  return (
    <Image
      width={360}
      height={400}
      className={`max-w-[75%] h-auto object-cover object-center absolute top-1/2 right-1/2 anim__fadeIn ${
        className || ''
      }`}
      ref={ref}
      {...props}
      alt={props.alt}
      priority
      onError={useCallback<ReactEventHandler>((e) => {
        const img = e.target as HTMLImageElement;
        let sourceExt = '';
        let targetExt = '';

        if (img.src.includes('webp')) {
          sourceExt = 'webp';
          targetExt = 'jpeg';
        } else if (img.src.includes('jpeg')) {
          sourceExt = 'jpeg';
          targetExt = 'png';
        }

        if (!targetExt) return;

        img.srcset = img.srcset.replace(new RegExp(sourceExt, 'gi'), targetExt);
        img.src = img.src.replace(sourceExt, targetExt);
      }, [])}
    />
  );
});

_Img.displayName = 'Img';

export const Img = memo(_Img);
