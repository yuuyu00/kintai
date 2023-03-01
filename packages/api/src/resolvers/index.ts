import { Resolvers } from "../gqlTypes";
import * as queries from "./queries";
import * as mutations from "./mutations";
import * as trivialResolvers from "./trivials";

const Query: Resolvers["Query"] = queries;

const Mutation: Resolvers["Mutation"] = mutations;

export const resolvers: Resolvers = {
  Query,
  Mutation,
  ...trivialResolvers,
};
