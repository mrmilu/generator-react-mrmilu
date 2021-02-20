import styled from 'styled-components';
import tw from 'twin.macro';

export const AppDiv = styled.div`
  text-align: center;
`;

export const AppHeader = styled.div`
  ${tw`bg-green`}
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  font-size: calc(10px + 2vmin);
  color: white;
`;
