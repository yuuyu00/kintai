import { PrismaClient } from "@prisma/client";
import * as firebase from "firebase-admin";

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  firebaseApp: firebase.app.App;
}

export const createContext = async (firebaseApp: firebase.app.App) => () => {
  return { prisma, firebaseApp };
};
