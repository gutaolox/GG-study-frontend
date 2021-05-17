/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Professor } from './Professor';
import * as messages from '../../intl/port.json';
import { IntlProvider } from 'react-intl';

test('renders learn react link', () => {
  render(
    <IntlProvider
      messages={messages.default}
      locale='pt-br'
      defaultLocale='pt-br'
    >
      <Professor />
    </IntlProvider>,
  );
  expect(screen).toBeDefined();
});
