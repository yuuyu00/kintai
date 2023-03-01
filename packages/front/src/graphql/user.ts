import { graphql } from "../generated-graphql";

export const USERS = graphql(`
  query usres {
    userList {
      id
      name
    }
  }
`);

export const USER = graphql(`
  query user($id: Int!) {
    user(id: $id) {
      id
      name
      workRecords {
        id
        startAt
        memo
        endAt
      }
    }
  }
`);
