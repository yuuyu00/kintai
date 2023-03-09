import * as functions from "firebase-functions";
import { app } from "./server";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const graphql = functions.https.onRequest(app);
