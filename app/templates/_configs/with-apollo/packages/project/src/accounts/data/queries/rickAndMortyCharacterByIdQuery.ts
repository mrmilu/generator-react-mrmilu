import { gql } from '@apollo/client/core';

export const rickAndMortyCharacterByIdQuery = gql`
  query RickAndMortyCharacterByIdQuery($id: ID!) {
    character(id: $id) {
      id
      name
      image
      type
      species
    }
  }
`;
