import { ApolloServer, gql } from "apollo-server";
import path from "path";
import { readFileSync } from "fs";
import * as firebase from "firebase-admin";
import { applicationDefault } from "firebase-admin/app";
import { createContext } from "./context";
import { resolvers } from "./resolvers";

const getTypeDefs = () => {
  const schemaPath = path.join("schema/", "schema.gql");
  const schemaStr = readFileSync(schemaPath, "utf8");
  return gql`
    ${schemaStr}
  `;
};

const firebaseApp = firebase.initializeApp({
  credential: applicationDefault(),
});

new ApolloServer({
  typeDefs: getTypeDefs(),
  context: createContext(firebaseApp),
  resolvers: resolvers,
}).listen({ port: 9000 }, () => console.log("listening on 9000"));
