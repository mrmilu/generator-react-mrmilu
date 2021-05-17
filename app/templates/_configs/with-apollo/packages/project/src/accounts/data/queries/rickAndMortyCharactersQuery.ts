import { gql } from '@apollo/client/core';

export const rickAndMortyCharactersQuery = gql`
  query RickAndMortyCharactersQuery {
    characters {
      results {
        id
        name
        image
        type
        species
      }
    }
  }
`;
