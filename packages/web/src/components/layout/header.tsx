import { Box, Flex, Text, MenuButton, IconButton, FlexProps } from 'theme-ui';
import React, { MutableRefObject } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

import { AuthActionType, useAuth } from '../../context/auth';
import { useAside, AsideActionType } from '../../context/aside';

interface HeaderProps {
  title: string;
  menuButtonRef?: MutableRefObject<HTMLElement>;
}

const Header: React.FC<HeaderProps & FlexProps> = ({
  title,
  menuButtonRef,
  ...props
}) => {
  const { dispatch: authDispatch } = useAuth();
  const { dispatch: asideDispatch } = useAside();

  return (
    <Flex
      as="header"
      {...props}
      sx={{
        alignItems: 'center',
        variant: 'layout.header',
        ...props.sx,
      }}
    >
      <MenuButton
        ref={menuButtonRef as never}
        onClick={() =>
          asideDispatch({
            type: AsideActionType.TOGGLE,
          })
        }
        sx={{
          cursor: 'pointer',
        }}
      />
      <Text>{title}</Text>
      <Box mx="auto" />
      <IconButton
        sx={{
          cursor: 'pointer',
        }}
        onClick={() =>
          authDispatch({
            type: AuthActionType.LOGOUT,
          })
        }
      >
        <FaSignOutAlt />
      </IconButton>
    </Flex>
  );
};

export default Header;
