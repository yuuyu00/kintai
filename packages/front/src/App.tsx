import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { WorkRecord } from "./containers";
import { Header } from "./components/organisms";

const cache: InMemoryCache = new InMemoryCache({});
const { NODE_ENV, REACT_APP_ENDPOINT_DEV, REACT_APP_ENDPOINT_PROD } =
  process.env;

export const apolloClient = new ApolloClient({
  cache,
  uri:
    NODE_ENV === "development"
      ? REACT_APP_ENDPOINT_DEV
      : REACT_APP_ENDPOINT_PROD,
});

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Header />
      <div className="px-20 py-16">
        <WorkRecord />
      </div>
    </ApolloProvider>
  );
};

export default App;
