import React, { useEffect } from 'react';
import { Global, ThemeProvider, css, withTheme, Theme } from '@emotion/react';
import { Router } from '@reach/router';
import shallow from 'zustand/shallow';

import theme from './theme';
import { ChartDraw, DrawSettings, Settings, About, Browse } from './pages';
import { useStore } from './stores/drawStore';
import installServiceWorker from './serviceWorker';

const globalStyle = (theme: Theme) => css`
  * {
    font-family: 'Roboto', 'Noto Sans JP', -apple-system, BlinkMacSystemFont,
      'Segoe UI', 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol';
  }

  body {
    margin: 0;
    background-color: ${theme.colors.gray[2]};
    overscroll-behavior-y: none;
  }
`;

interface GlobalStyleProps {
  theme: Theme;
}

const GlobalStyle = withTheme(({ theme }: GlobalStyleProps) => {
  return <Global styles={globalStyle(theme)} />;
});

const App = () => {
  installServiceWorker();
  const [gameDataLoad, chartsDraw] = useStore(
    (state) => [state.gameDataLoad, state.chartsDraw],
    shallow
  );

  // Draw charts once when application mounts
  useEffect(() => {
    const onLoad = async () => {
      await gameDataLoad();
      chartsDraw();
    };

    onLoad();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <ChartDraw path="/" />
        <Browse path="/browse" />
        <DrawSettings path="/draw-settings" />
        <Settings path="/settings" />
        <About path="/settings/about" />
      </Router>
    </ThemeProvider>
  );
};

export default App;
