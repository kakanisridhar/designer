import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Label, Input, Spinner, Flex } from 'theme-ui';

import { emailRegExp } from '@nestjs-graphql-react/common';
import FormErrors from '../../../components/forms/errors';

export interface LoginFormValue {
  email: string;
  password: string;
}

export interface LoginFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: ({ variables: LoginFormValue }) => void | Promise<any>;
  loading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ loading, onSubmit }) => {
  const { register, handleSubmit, errors } = useForm();

  return (
    <Box
      title="login-form"
      as="form"
      onSubmit={handleSubmit((variables) => onSubmit({ variables }))}
      py={3}
    >
      <Box px={2} mt={2}>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          ref={register({
            required: true,
            pattern: emailRegExp,
          })}
        />
      </Box>
      <Box px={2} mt={2}>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          ref={register({
            required: true,
          })}
        />
      </Box>
      <Flex
        px={2}
        mt={2}
        sx={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Button
          sx={{
            width: '100px',
          }}
        >
          {loading ? <Spinner size={12} /> : 'submit'}
        </Button>
      </Flex>
      <FormErrors
        errors={errors}
        messages={{
          email: { required: 'Email is required', pattern: 'Invalid email' },
          password: { required: 'Password is required' },
        }}
      />
    </Box>
  );
};

export default LoginForm;
