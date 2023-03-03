'use client';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { useState } from 'react';

export default function RootStyleRegistry({
  children
}: {
  children: React.ReactNode;
}) {
  const [cache] = useState(() => {
    const cache = createCache({ key: 'css', prepend: true });
    cache.compat = true;
    return cache;
  });

  useServerInsertedHTML(() => {
    /* Inject MUI styles first to match with the prepend: true configuration. */
    return (
      <style
        id="emotion-styles"
        data-emotion={`css server ${Object.keys(cache.inserted).join(' ')}`}>
        {Object.values(cache.inserted).join(' ')}
      </style>
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
