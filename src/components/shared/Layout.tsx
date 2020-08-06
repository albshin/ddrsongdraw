import styled from '@emotion/styled';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

interface ContentProps {
  hasBottomNav?: boolean;
}

export const Content = styled.main<ContentProps>`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  margin-top: ${(props) => props.theme.navbarHeight};
  ${(props) =>
    props.hasBottomNav &&
    `
    margin-bottom: ${props.theme.navbarHeight};
  `}
  width: 100%;
  max-width: ${(props) => props.theme.maxWidth};
  margin-left: auto;
  margin-right: auto;
`;
