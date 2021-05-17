/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import * as messages from '../intl/port.json';
import { Login } from './Login';
import { IntlProvider } from 'react-intl';

test('renders learn react link', () => {
  render(
    <IntlProvider
      messages={messages.default}
      locale='pt-br'
      defaultLocale='pt-br'
    >
      <Login />
    </IntlProvider>,
  );
  expect(screen).toBeDefined();
});
