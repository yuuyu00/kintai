import { graphql } from "../generated-graphql";

export const WORKS_RECORDS = graphql(`
  query workRecordList {
    workRecordList {
      id
      startAt
      endAt
      memo
    }
  }
`);

export const START_WORK = graphql(`
  mutation startWork($input: CreateWorkRecordInput!) {
    createWorkRecord(input: $input) {
      id
    }
  }
`);

export const END_WORK = graphql(`
  mutation endWork($input: UpdateWorkRecordInput!) {
    updateWorkRecord(input: $input) {
      id
    }
  }
`);

export const UPDATE_WORK = graphql(`
  mutation endWork($input: UpdateWorkRecordInput!) {
    updateWorkRecord(input: $input) {
      id
    }
  }
`);

export const DELETE_WORK = graphql(`
  mutation deleteWork($deleteWorkRecordId: Int!) {
    deleteWorkRecord(id: $deleteWorkRecordId) {
      id
    }
  }
`);
