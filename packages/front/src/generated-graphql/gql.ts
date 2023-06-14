/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query users {\n    userList {\n      id\n      name\n    }\n  }\n": types.UsersDocument,
    "\n  query user {\n    user {\n      id\n      name\n      plannedWorkTime\n      workRecords {\n        id\n        startAt\n        memo\n        endAt\n      }\n    }\n  }\n": types.UserDocument,
    "\n  query userByToken($token: String!) {\n    userByToken(token: $token) {\n      id\n      name\n      plannedWorkTime\n      workRecords {\n        id\n        startAt\n        memo\n        endAt\n      }\n    }\n  }\n": types.UserByTokenDocument,
    "\n  mutation createUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      id\n      name\n      plannedWorkTime\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation startWork($input: CreateWorkRecordInput!) {\n    createWorkRecord(input: $input) {\n      id\n    }\n  }\n": types.StartWorkDocument,
    "\n  mutation endWork($input: UpdateWorkRecordInput!) {\n    updateWorkRecord(input: $input) {\n      id\n    }\n  }\n": types.EndWorkDocument,
    "\n  mutation deleteWork($deleteWorkRecordId: Int!) {\n    deleteWorkRecord(id: $deleteWorkRecordId) {\n      id\n    }\n  }\n": types.DeleteWorkDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query users {\n    userList {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query users {\n    userList {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query user {\n    user {\n      id\n      name\n      plannedWorkTime\n      workRecords {\n        id\n        startAt\n        memo\n        endAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query user {\n    user {\n      id\n      name\n      plannedWorkTime\n      workRecords {\n        id\n        startAt\n        memo\n        endAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query userByToken($token: String!) {\n    userByToken(token: $token) {\n      id\n      name\n      plannedWorkTime\n      workRecords {\n        id\n        startAt\n        memo\n        endAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query userByToken($token: String!) {\n    userByToken(token: $token) {\n      id\n      name\n      plannedWorkTime\n      workRecords {\n        id\n        startAt\n        memo\n        endAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      id\n      name\n      plannedWorkTime\n    }\n  }\n"): (typeof documents)["\n  mutation createUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      id\n      name\n      plannedWorkTime\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation startWork($input: CreateWorkRecordInput!) {\n    createWorkRecord(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation startWork($input: CreateWorkRecordInput!) {\n    createWorkRecord(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation endWork($input: UpdateWorkRecordInput!) {\n    updateWorkRecord(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation endWork($input: UpdateWorkRecordInput!) {\n    updateWorkRecord(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteWork($deleteWorkRecordId: Int!) {\n    deleteWorkRecord(id: $deleteWorkRecordId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteWork($deleteWorkRecordId: Int!) {\n    deleteWorkRecord(id: $deleteWorkRecordId) {\n      id\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;