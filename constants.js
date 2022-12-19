import { gql } from "@apollo/client";

export const URL = "https://rickandmortyapi.com/graphql";
export const myURL = "http://localhost:3000/";
export const GET_CHARACTERS = gql`
  query getCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        pages
      }
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

export const speciesCharacter = [
  "Alien",
  "Disease",
  "Human",
  "Humanoid",
  "Robot",
  "Poopybutthole",
  "Mythological Creature",
];

export const genderCharacter = ["Male", "Female", "unknown"];

export const statusCharacter = ["Alive", "Dead", "unknown"];
