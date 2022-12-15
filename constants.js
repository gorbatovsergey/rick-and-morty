import { gql } from "@apollo/client";

export const URL = "https://rickandmortyapi.com/graphql";
export const myURL = "http://localhost:3000/";
export const GET_CHARACTERS = gql`
  query getCharacters($filter: FilterCharacter) {
    characters(filter: $filter) {
      results {
        name
        status
        species
        type
        gender
        location {
          name
        }
        episode {
          name
        }
      }
    }
  }
`;
