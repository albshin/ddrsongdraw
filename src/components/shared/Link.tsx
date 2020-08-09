import React, { useCallback } from 'react';
import { Link as ReachLink, LinkProps as ReachLinkProps } from '@reach/router';
import { useTheme } from '@emotion/react';
import shallow from 'zustand/shallow';
import { useStore } from '../../stores/drawStore';

interface LinkProps extends Omit<ReachLinkProps<{}>, 'ref'> {}

const Link = ({ children, onClick, to, ...props }: LinkProps) => {
  const theme = useTheme();
  const [updateAvailable, gameDataSetUpdate] = useStore(
    (state) => [state.store.gameData.updateAvailable, state.gameDataSetUpdate],
    shallow
  );

  const handleOnClick = useCallback((e) => {
    if (updateAvailable) {
      e.preventDefault();
      gameDataSetUpdate(false);
      return window.location.assign(to);
    }
    if (onClick) onClick(e);
  }, []);

  return (
    <ReachLink
      to={to}
      getProps={({ isCurrent }) => ({
        style: {
          color: isCurrent ? theme.colors.primary || 'inherit' : 'inherit',
        },
      })}
      onClick={handleOnClick}
      {...props}
    >
      {children}
    </ReachLink>
  );
};

export default Link;
