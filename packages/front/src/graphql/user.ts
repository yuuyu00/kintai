import { graphql } from "../generated-graphql";

export const USERS = graphql(`
  query users {
    userList {
      id
      name
    }
  }
`);

export const USER = graphql(`
  query userByToken($token: String!) {
    userByToken(token: $token) {
      id
      name
      plannedWorkTime
      workRecords {
        id
        startAt
        memo
        endAt
      }
    }
  }
`);

export const CREATE_USER = graphql(`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      plannedWorkTime
    }
  }
`);
