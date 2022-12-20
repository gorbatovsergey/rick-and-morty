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

export const сharacterInformationElements = [
  { text: "Name:", key: "name" },
  { text: "Status:", key: "status" },
  { text: "Species:", key: "species" },
  { text: "Type:", key: "type" },
  { text: "Gender:", key: "gender" },
  { text: "Location name:", key: "location" },
  { text: "Episode name:", key: "episode" },
];

export const arrayFiltres = [
  {
    inputLabelName: "Status",
    key: "status",
    id: "filter-status",
    list: ["Alive", "Dead", "unknown"],
  },
  {
    inputLabelName: "Species",
    key: "species",
    id: "filter-species",
    list: [
      "Alien",
      "Disease",
      "Human",
      "Humanoid",
      "Robot",
      "Poopybutthole",
      "Mythological Creature",
    ],
  },
  {
    inputLabelName: "Gender",
    key: "gender",
    id: "filter-gender",
    list: ["Male", "Female", "unknown"],
  },
  {
    inputLabelName: "Type",
    key: "type",
    id: "filter-type",
  },
];
