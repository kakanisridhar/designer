import React from 'react';

import LoginForm, { LoginFormProps } from './login-form';
import { render, act, screen, fireEvent } from '@testing-library/react';
import { wait } from '@apollo/react-testing';

describe('[login page] login form components', () => {
  let props: LoginFormProps;

  beforeEach(() => {
    props = {
      onSubmit: jest.fn(),
    };
  });

  describe('when filled with correct data and submit', () => {
    const goodUser = { email: 'foo@foo.com', password: 'Pass@432e' };

    it('should call the onSubmit prop', async () => {
      const submitSpy = jest.spyOn(props, 'onSubmit');

      await act(async () => {
        render(<LoginForm {...props} />);

        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');

        emailInput.setAttribute('value', goodUser.email);
        passwordInput.setAttribute('value', goodUser.password);

        const form = screen.getByTitle('login-form');
        fireEvent(form, new Event('submit'));

        await wait(0);
      });

      expect(submitSpy)
        .toHaveBeenCalledTimes(1)
        .toHaveBeenCalledWith({ variables: goodUser });
    });
  });

  describe('when filled with invalid email and submit', () => {
    const badEmailUser = { email: 'barfoo.com', password: 'Pass@4DQ3d' };

    it('should not call the onSubmit props', async () => {
      const submitSpy = jest.spyOn(props, 'onSubmit');

      await act(async () => {
        render(<LoginForm {...props} />);

        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');

        emailInput.setAttribute('value', badEmailUser.email);
        passwordInput.setAttribute('value', badEmailUser.password);

        const form = screen.getByTitle('login-form');
        fireEvent(form, new Event('submit'));

        await wait(0);
      });

      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  describe('when submit empty', () => {
    it('should not call the onSubmit props', async () => {
      const submitSpy = jest.spyOn(props, 'onSubmit');

      await act(async () => {
        render(<LoginForm {...props} />);

        const form = screen.getByTitle('login-form');
        fireEvent(form, new Event('submit'));

        await wait(0);
      });

      expect(submitSpy).not.toHaveBeenCalled();
    });
  });
});
