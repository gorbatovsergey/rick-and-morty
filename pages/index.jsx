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
import { Filter, Character } from "../components/index.js";
import { arrayFiltres, GET_CHARACTERS } from "../constants/constants";
import client from "../utils/helpers";
import styles from "../styles/index.module.scss";

const Index = (props) => {
  const id = useId();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { status, species, gender, type } = router.query;
  const [filters, setFilters] = useState({
    status: status ?? "",
    species: species ?? "",
    gender: gender ?? "",
    type: type ?? "",
  });
  const { results: characters, info } = props.data.characters;
  const maxPages = info.pages;
  const getCharacters = useCallback(
    debounce((queryString) => router.push("?" + queryString), 500),
    []
  );

  const addFiltres = (event) => {
    const { name, value } = event.target;
    const stringified = queryString.stringify(
      { page: 1, ...filters, [name]: value },
      { skipEmptyString: true }
    );

    setFilters({ ...filters, [name]: value });
    setPage(1);
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
      { skipEmptyString: true }
    );

    setPage(num);
    router.push("?" + stringified);
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
              {arrayFiltres.map(({ inputLabelName, key, id, list }, index) =>
                key === "type" ? (
                  <TextField
                    id={id}
                    label={inputLabelName}
                    variant="outlined"
                    value={filters[key]}
                    onChange={addFiltres}
                    name={key}
                    sx={{ width: 250, marginBottom: 2 }}
                    key={`${id}-${index}`}
                  />
                ) : (
                  <Filter
                    inputLabelName={inputLabelName}
                    selectName={key}
                    id={id}
                    selectValue={filters[key]}
                    addFiltres={addFiltres}
                    key={`${id}-${index}`}
                  >
                    {list.map((items, index) => (
                      <MenuItem key={`${id}-${index}`} value={items}>
                        {items}
                      </MenuItem>
                    ))}
                  </Filter>
                )
              )}
            </div>
            <div className={styles.filtersButton}>
              <Button variant="contained" onClick={resetFiltres}>
                Reset
              </Button>
            </div>
          </div>
          {loading ? (
            <div className={styles.loader}>
              <CircularProgress size="80px" />
            </div>
          ) : (
            <div className={styles.borderCharacters}>
              <div className={styles.listCharacters}>
                {characters.length === 0 ? (
                  <h2>No characters with selected filters</h2>
                ) : (
                  characters.map((character, index) => (
                    <Character key={`${id}-${index}`} character={character} />
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Index;

export async function getServerSideProps({ query }) {
  let initialPage = 1;

  if (query.page) {
    initialPage = parseInt(query.page);
    delete query.page;
  }

  const { data } = await client.query({
    query: GET_CHARACTERS,
    variables: {
      page: Number(initialPage),
      filter: query,
    },
  });

  return {
    props: { data },
  };
}
