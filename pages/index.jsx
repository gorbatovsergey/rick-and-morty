import { useState, useId, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import qs from "qs";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Filter from "../components/Filter";
import Character from "../components/Character";
import { GET_CHARACTERS } from "../constants";
import client from "../helpers";
import styles from "../styles/index.module.scss";

const Index = (props) => {
  const id = useId();
  const router = useRouter();
  const characters = props.data.characters.results;

  const [queryString, setQueryString] = useState("");
  const [filters, setFilters] = useState({
    status: router.query.status ? router.query.status : null,
    species: router.query.species ? router.query.species : null,
    gender: router.query.gender ? router.query.gender : null,
    type: router.query.type ? router.query.type : null,
  });

  useEffect(() => {
    setQueryString(
      qs.stringify(
        {
          status: filters.status,
          species: filters.species,
          gender: filters.gender,
          type: filters.type,
        },
        { skipNulls: true }
      )
    );
  }, [filters]);

  const addUrl = () => {
    router.push("?" + queryString);
  };

  const addFiltres = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  const resetFiltres = () => {
    setFilters({
      status: null,
      species: null,
      gender: null,
      type: null,
    });

    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Rick & Morty</title>
      </Head>
      <div className={styles.main}>
        <h1 className={styles.title}>Rick & Morty</h1>
        <div className={styles.content}>
          <div className={styles.filters}>
            <div className={styles.filtersInputs}>
              <Filter
                inputLabelName={"Status"}
                selectName={"status"}
                id={"filter-status"}
                selectValue={filters.status}
                addFiltres={addFiltres}
              >
                <MenuItem value="Alive">Alive</MenuItem>
                <MenuItem value="Dead">Dead</MenuItem>
                <MenuItem value="unknown">unknown</MenuItem>
              </Filter>
              <Filter
                inputLabelName={"Species"}
                selectName={"species"}
                id={"filter-species"}
                selectValue={filters.species}
                addFiltres={addFiltres}
              >
                <MenuItem value="Human">Human</MenuItem>
                <MenuItem value="Alien">Alien</MenuItem>
              </Filter>
              <Filter
                inputLabelName={"Gender"}
                selectName={"gender"}
                id={"filter-gender"}
                selectValue={filters.gender}
                addFiltres={addFiltres}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="unknown">unknown</MenuItem>
              </Filter>
              <Filter
                inputLabelName={"Type"}
                selectName={"type"}
                id={"filter-type"}
                selectValue={filters.type}
                addFiltres={addFiltres}
              >
                <MenuItem value="">none</MenuItem>
                <MenuItem value="Genetic experiment">
                  Genetic experiment
                </MenuItem>
                <MenuItem value="Superhuman (Ghost trains summoner)">
                  Superhuman (Ghost trains summoner)
                </MenuItem>
                <MenuItem value="Parasite">Parasite</MenuItem>
                <MenuItem value="Human with antennae">
                  Human with antennae
                </MenuItem>
                <MenuItem value="Human with ants in his eyes">
                  Human with ants in his eyes
                </MenuItem>
              </Filter>
            </div>
            <div className={styles.filtersButtons}>
              <Button variant="contained" onClick={addUrl}>
                Apply
              </Button>
              &nbsp;
              <Button variant="contained" onClick={resetFiltres}>
                Reset
              </Button>
            </div>
          </div>
          <div className={styles.listCharacters}>
            {characters.length === 0 ? (
              <h2>No characters with selected filters</h2>
            ) : (
              characters.map((character, index) => (
                <Character
                  key={`${id}-${index}`}
                  name={character.name}
                  status={character.status}
                  species={character.species}
                  type={character.type}
                  gender={character.gender}
                  locationName={character.location.name}
                  episodes={character.episode}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;

export async function getServerSideProps(context) {
  const query = context.query;
  const { data } = await client.query({
    query: GET_CHARACTERS,
    variables: {
      filter: query,
    },
  });

  return {
    props: { data },
  };
}
