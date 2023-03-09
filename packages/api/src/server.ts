import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { readFileSync } from "fs";
import * as firebase from "firebase-admin";
import { applicationDefault } from "firebase-admin/app";
import { resolvers } from "./resolvers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const app = express();

const startServer = async () => {
  const getTypeDefs = () => {
    const schemaPath = path.join("schema/", "schema.gql");
    const schemaStr = readFileSync(schemaPath, "utf8");
    return `#graphql
    ${schemaStr}
  `;
  };

  const firebaseApp = firebase.initializeApp({
    credential: applicationDefault(),
  });

  const server = new ApolloServer({
    typeDefs: getTypeDefs(),
    resolvers: resolvers,
  });

  await server.start();

  app.use(
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization;

        if (!token) {
          return {
            prisma,
            firebaseApp,
            user: null,
          };
        }

        const decodedToken = await firebaseApp.auth().verifyIdToken(token);
        const user = await prisma.user.findFirst({
          where: { firebaseUid: decodedToken.uid },
        });

        return { prisma, firebaseApp, user };
      },
    })
  );

  return app;
};

startServer();
