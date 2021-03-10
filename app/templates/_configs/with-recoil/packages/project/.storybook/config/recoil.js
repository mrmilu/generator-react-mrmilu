import React from 'react';
import { RecoilRoot } from 'recoil';
import { addDecorator } from '@storybook/react';

addDecorator(
  (Story) => (
    <RecoilRoot>
      <Story />
    </RecoilRoot>
  )
);
