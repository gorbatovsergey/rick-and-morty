import { ApolloClient, InMemoryCache } from "@apollo/client";
import { URL } from "../constants/constants";

const client = new ApolloClient({
  uri: URL,
  cache: new InMemoryCache(),
});

export default client;
