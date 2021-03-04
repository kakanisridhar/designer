/** @jsx jsx */
import { jsx, Box } from 'theme-ui';
import React, { useRef, useEffect, MutableRefObject } from 'react';
import styled from '@emotion/styled';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Theme } from 'theme-ui';
import { NavLink } from 'react-router-dom';

import { Routes, routesNameMapper } from '../../config/enums';
import { useAside, AsideActionType } from '../../context/aside';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import useKeyPress from '../../hooks/useKeyPress';

const MotionAside = styled(motion.aside)`
  position: absolute;
  min-width: 0;
  height: 100%;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
  transform: translateX(-100%);
  display: flex;
  flex-direction: column;
`;

interface AsideProps {
  menuButtonRef?: MutableRefObject<HTMLElement>;
}

const Aside: React.FC<HTMLMotionProps<'ruby'> & AsideProps> = ({
  menuButtonRef,
  ...props
}) => {
  const asideRef = useRef<HTMLElement>();
  const { dispatch, asideState } = useAside();
  const refs = [asideRef];
  if (menuButtonRef) refs.push(menuButtonRef);
  useOnClickOutside(
    refs,
    () => asideState.isOpen && dispatch({ type: AsideActionType.CLOSE }),
  );

  const isEscPressed = useKeyPress('Escape');

  useEffect(() => {
    if (isEscPressed && asideState.isOpen)
      dispatch({ type: AsideActionType.CLOSE });
  }, [isEscPressed, asideState.isOpen, dispatch]);

  return (
    <MotionAside
      {...props}
      sx={{
        variant: 'layout.aside',
      }}
      ref={asideRef}
    >
      <Box
        as="nav"
        sx={{
          variant: 'layout.aside.nav',
        }}
      >
        {Object.values(Routes)
          .filter((route) => route !== Routes.LOGIN)
          .map((route) => (
            <NavLink
              to={route}
              key={route}
              exact={true}
              activeStyle={{
                backgroundColor: 'gray',
              }}
              sx={{
                variant: 'layout.aside.link',
              }}
            >
              {routesNameMapper[route]}
            </NavLink>
          ))}
      </Box>
    </MotionAside>
  );
};

export default Aside;
