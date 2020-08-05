import { useRef, useEffect, useCallback } from 'react';
import throttle from 'lodash.throttle';
import { FixedSizeList, ListOnScrollProps } from 'react-window';

const getWindowScrollPosition = () =>
  window.pageYOffset || document.documentElement.scrollTop || 0;

const useWindowScroll = () => {
  const ref = useRef<FixedSizeList>();

  useEffect(() => {
    const handleScroll = throttle(() => {
      ref.current?.scrollTo(getWindowScrollPosition());
    }, 10);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onScroll = useCallback(
    ({ scrollOffset, scrollUpdateWasRequested }: ListOnScrollProps) => {
      if (!scrollUpdateWasRequested) return;
      window.scrollTo(0, scrollOffset);
    },
    []
  );

  return {
    ref,
    bind: {
      style: {
        overflow: 'visible',
        display: 'inline-block',
      },
      onScroll,
    },
  };
};

export default useWindowScroll;
