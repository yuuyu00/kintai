import { PrismaClient, User } from "@prisma/client";
import * as firebase from "firebase-admin";

export interface Context {
  prisma: PrismaClient;
  user: User | null;
  firebaseApp: firebase.app.App;
}
