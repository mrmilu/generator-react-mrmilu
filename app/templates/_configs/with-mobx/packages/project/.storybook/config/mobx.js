import React from 'react';
import { RootStore, StoreContext } from './common/view/store/root.store';
import { addDecorator } from '@storybook/react';

addDecorator(
  (Story) => (
    <StoreContext.Provider value={new RootStore()}>
      <Story />
    </StoreContext.Provider>
  )
);
