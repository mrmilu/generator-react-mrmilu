import React from 'react';
import { Provider } from 'react-redux';
import store from '../../src/state/store';
import { addDecorator } from '@storybook/react';

addDecorator(
  (Story) => (
    <Provider store={store}>
      <Story />
    </Provider>
  )
);
