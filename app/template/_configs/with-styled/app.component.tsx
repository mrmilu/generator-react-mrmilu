import React from 'react';
import 'twin.macro';
import { AppContainer, AppHeaderContainer } from './app.styles';

function App() {
  return (
    <AppContainer>
      <AppHeaderContainer>
        <p tw='bg-green-200'>
          Sample code
        </p>
      </AppHeaderContainer>
    </AppContainer>
  );
}

export default App;
