import { gql } from '@apollo/client/core';
import { rickAndMortyCharacterFragment } from './rickAndMortyCharacterFragment';

export const rickAndMortyCharacterByIdQuery = gql`
  ${rickAndMortyCharacterFragment}
  query RickAndMortyCharacterByIdQuery($id: ID!) {
    character(id: $id) {
      ...RickAndMortyCharacterFragment
    }
  }
`;
