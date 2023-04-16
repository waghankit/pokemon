import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import App from "./App";

const client = new ApolloClient({
  uri: "https://graphql-pokemon2.vercel.app",
  cache: new InMemoryCache()
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  rootElement
);