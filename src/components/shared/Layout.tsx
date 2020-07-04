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
  flex: 1;
  overflow-x: hidden;
  overflow-y: scroll;
  margin-top: ${(props) => props.theme.navbarHeight};
  margin-bottom: ${(props) =>
    props.hasBottomNav ? props.theme.navbarHeight : ''};
`;
