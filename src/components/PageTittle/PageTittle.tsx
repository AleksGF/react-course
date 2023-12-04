import React, { type FC, memo } from 'react';
import { useMatches } from 'react-router-dom';

const PageTittle: FC = () => {
  const match = useMatches().at(-1);
  const pageTittle =
    match &&
    match.handle &&
    typeof match.handle === 'object' &&
    'navName' in match.handle
      ? (match.handle.navName as () => string)()
      : null;

  return <h2>{pageTittle ?? ''}</h2>;
};

export default memo(PageTittle);
