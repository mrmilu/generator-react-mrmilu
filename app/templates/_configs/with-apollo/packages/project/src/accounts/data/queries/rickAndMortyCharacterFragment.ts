import { gql } from '@apollo/client/core';

export const rickAndMortyCharacterFragment = gql`
  fragment RickAndMortyCharacterFragment on Character {
    id
    name
    image
    type
    species
  }
`;
