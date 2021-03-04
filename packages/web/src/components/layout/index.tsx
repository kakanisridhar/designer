/** @jsx jsx */
import { Box, Container, jsx } from 'theme-ui';
import React, { useRef } from 'react';

import { useAside } from '../../context/aside';
import Aside from './aside';
import Header from './header';
import AnimatedPage from './animatedPage';

export interface LayoutProps {
  aside?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ aside, children }) => {
  const { asideState } = useAside();
  const menuButtonRef = useRef<HTMLElement>();

  return (
    <AnimatedPage sx={{ variant: 'layout' }}>
      <Header title="My app" menuButtonRef={menuButtonRef} />
      <Box sx={{ variant: 'layout.main' }}>
        {aside && (
          <Aside
            animate={asideState.isOpen ? 'open' : 'closed'}
            variants={{
              open: { opacity: 1, x: 0 },
              closed: { opacity: 0, x: '-100%' },
            }}
            menuButtonRef={menuButtonRef}
          />
        )}
        <Container as="main">{children}</Container>
      </Box>
      <Box as="footer" sx={{ variant: 'layout.footer' }}>
        <Container>Footer</Container>
      </Box>
    </AnimatedPage>
  );
};

export default Layout;
