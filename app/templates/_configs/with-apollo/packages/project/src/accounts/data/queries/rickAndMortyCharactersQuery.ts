import { gql } from '@apollo/client/core';
import { rickAndMortyCharacterFragment } from './rickAndMortyCharacterFragment';

export const rickAndMortyCharactersQuery = gql`
  ${rickAndMortyCharacterFragment}
  query RickAndMortyCharactersQuery {
    characters {
      results {
        ...RickAndMortyCharacterFragment
      }
    }
  }
`;
