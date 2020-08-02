import React, { useEffect } from 'react';
import { Global, ThemeProvider, css, withTheme, Theme } from '@emotion/react';
import { Router } from '@reach/router';

import theme from './theme';
import { ChartDraw, DrawSettings, Settings, About } from './pages';
import { useStore } from './stores/drawStore';

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
  const chartsDraw = useStore((state) => state.chartsDraw);

  // Draw charts once when application mounts
  useEffect(() => {
    chartsDraw();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <ChartDraw path="/" />
        <DrawSettings path="/draw-settings" />
        <Settings path="/settings" />
        <About path="/settings/about" />
      </Router>
    </ThemeProvider>
  );
};

export default App;
