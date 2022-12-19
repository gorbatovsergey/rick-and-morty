import { useState, useId, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import queryString from "query-string";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import debounce from "lodash.debounce";
import Filter from "../components/Filter";
import Character from "../components/Character";
import {
  genderCharacter,
  GET_CHARACTERS,
  speciesCharacter,
  statusCharacter,
} from "../constants";
import client from "../helpers";
import styles from "../styles/index.module.scss";

const Index = (props) => {
  const id = useId();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    status: router.query.status ? router.query.status : "",
    species: router.query.species ? router.query.species : "",
    gender: router.query.gender ? router.query.gender : "",
    type: router.query.type ? router.query.type : "",
  });
  const characters = props.data.characters.results;
  const maxPages = props.data.characters.info.pages;
  const getCharacters = useCallback(
    debounce((queryString) => router.push("?" + queryString), 1500),
    []
  );

  const addFiltres = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });

    const stringified = queryString.stringify(
      { page, ...filters, [event.target.name]: event.target.value },
      {
        skipEmptyString: true,
      }
    );

    getCharacters(stringified);
  };

  const resetFiltres = () => {
    setFilters({
      status: "",
      species: "",
      gender: "",
      type: "",
    });
    setPage(1);

    router.push("/");
  };

  const changePage = (num) => {
    const stringified = queryString.stringify(
      { page: num, ...filters },
      {
        skipEmptyString: true,
      }
    );

    router.push("?" + stringified);
    setPage(num);
  };

  useEffect(() => {
    router.events.on("routeChangeStart", () => setLoading(true));
    router.events.on("routeChangeComplete", () => setLoading(false));

    return () => {
      router.events.off("routeChangeStart", () => setLoading(true));
      router.events.off("routeChangeComplete", () => setLoading(false));
    };
  }, []);

  return (
    <>
      <Head>
        <title>Rick & Morty</title>
      </Head>
      <div className={styles.main}>
        <h1 className={styles.title}>Rick & Morty</h1>
        <Pagination
          count={maxPages}
          color="primary"
          page={page}
          onChange={(_, num) => changePage(num)}
        />
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
                {statusCharacter.map((status, index) => (
                  <MenuItem key={`${id}-${index}`} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Filter>
              <Filter
                inputLabelName={"Species"}
                selectName={"species"}
                id={"filter-species"}
                selectValue={filters.species}
                addFiltres={addFiltres}
              >
                {speciesCharacter.map((species, index) => (
                  <MenuItem key={`${id}-${index}`} value={species}>
                    {species}
                  </MenuItem>
                ))}
              </Filter>
              <Filter
                inputLabelName={"Gender"}
                selectName={"gender"}
                id={"filter-gender"}
                selectValue={filters.gender}
                addFiltres={addFiltres}
              >
                {genderCharacter.map((gender, index) => (
                  <MenuItem key={`${id}-${index}`} value={gender}>
                    {gender}
                  </MenuItem>
                ))}
              </Filter>
              <TextField
                id="filter-type"
                label="Type"
                variant="outlined"
                value={filters.type}
                onChange={addFiltres}
                name={"type"}
                sx={{ width: 250, marginBottom: 2 }}
              />
            </div>
            <div className={styles.filtersButton}>
              <Button variant="contained" onClick={resetFiltres}>
                Reset
              </Button>
            </div>
          </div>
          {loading ? (
            <div className={styles.loader}>
              <CircularProgress size="200px" />
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </>
  );
};

export default Index;

export async function getServerSideProps(context) {
  let page = 1;
  const query = context.query;
  if (context.query.page) {
    page = parseInt(context.query.page);
    delete query.page;
  }

  const { data } = await client.query({
    query: GET_CHARACTERS,
    variables: {
      page: Number(page),
      filter: query,
    },
  });

  return {
    props: { data },
  };
}
