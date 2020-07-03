import React from 'react';
import { Global, ThemeProvider, css, withTheme, Theme } from '@emotion/react';
import { Router } from '@reach/router';

import theme from './theme';
import CardDraw from './pages/CardDraw';
import DrawSettings from './pages/DrawSettings';
import Settings from './pages/Settings';

const globalStyle = (theme: Theme) => css`
  * {
    font-family: 'Roboto', 'Noto Sans JP', -apple-system, BlinkMacSystemFont,
      'Segoe UI', 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol';
  }

  body {
    margin: 0;
    background-color: ${theme.colors.gray[2]};
  }
`;

interface GlobalStyleProps {
  theme: Theme;
}

const GlobalStyle = withTheme(({ theme }: GlobalStyleProps) => {
  return <Global styles={globalStyle(theme)} />;
});

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Router>
      <CardDraw path="/" />
      <DrawSettings path="/draw-settings" />
      <Settings path="/settings" />
    </Router>
  </ThemeProvider>
);

export default App;
