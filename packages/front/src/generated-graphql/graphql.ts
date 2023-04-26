/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateUserInput = {
  name: Scalars['String'];
  plannedWorkTime: Scalars['Int'];
  token: Scalars['String'];
};

export type CreateWorkRecordInput = {
  endAt?: InputMaybe<Scalars['String']>;
  memo?: InputMaybe<Scalars['String']>;
  startAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  createWorkRecord: WorkRecord;
  deleteWorkRecord: WorkRecord;
  noop?: Maybe<NoopPayload>;
  updateWorkRecord: WorkRecord;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateWorkRecordArgs = {
  input: CreateWorkRecordInput;
};


export type MutationDeleteWorkRecordArgs = {
  id: Scalars['Int'];
};


export type MutationNoopArgs = {
  input?: InputMaybe<NoopInput>;
};


export type MutationUpdateWorkRecordArgs = {
  input: UpdateWorkRecordInput;
};

export type Node = {
  id: Scalars['ID'];
};

export type NoopInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
};

export type NoopPayload = {
  __typename?: 'NoopPayload';
  clientMutationId?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  node?: Maybe<Node>;
  user?: Maybe<User>;
  userByToken?: Maybe<User>;
  userList: Array<User>;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryUserByTokenArgs = {
  token: Scalars['String'];
};

export type UpdateWorkRecordInput = {
  endAt?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  memo?: InputMaybe<Scalars['String']>;
  startAt?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  name: Scalars['String'];
  plannedWorkTime: Scalars['Int'];
  workRecords: Array<WorkRecord>;
};

export type WorkRecord = {
  __typename?: 'WorkRecord';
  craetedAt: Scalars['String'];
  endAt?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  memo?: Maybe<Scalars['String']>;
  startAt: Scalars['String'];
  user: User;
  userId: Scalars['Int'];
};

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', userList: Array<{ __typename?: 'User', id: number, name: string }> };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, name: string, plannedWorkTime: number, workRecords: Array<{ __typename?: 'WorkRecord', id: number, startAt: string, memo?: string | null, endAt?: string | null }> } | null };

export type UserByTokenQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type UserByTokenQuery = { __typename?: 'Query', userByToken?: { __typename?: 'User', id: number, name: string, plannedWorkTime: number, workRecords: Array<{ __typename?: 'WorkRecord', id: number, startAt: string, memo?: string | null, endAt?: string | null }> } | null };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: number, name: string, plannedWorkTime: number } };

export type StartWorkMutationVariables = Exact<{
  input: CreateWorkRecordInput;
}>;


export type StartWorkMutation = { __typename?: 'Mutation', createWorkRecord: { __typename?: 'WorkRecord', id: number } };

export type EndWorkMutationVariables = Exact<{
  input: UpdateWorkRecordInput;
}>;


export type EndWorkMutation = { __typename?: 'Mutation', updateWorkRecord: { __typename?: 'WorkRecord', id: number } };

export type DeleteWorkMutationVariables = Exact<{
  deleteWorkRecordId: Scalars['Int'];
}>;


export type DeleteWorkMutation = { __typename?: 'Mutation', deleteWorkRecord: { __typename?: 'WorkRecord', id: number } };


export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"plannedWorkTime"}},{"kind":"Field","name":{"kind":"Name","value":"workRecords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"memo"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}}]}}]}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const UserByTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userByToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userByToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"plannedWorkTime"}},{"kind":"Field","name":{"kind":"Name","value":"workRecords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"memo"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}}]}}]}}]}}]} as unknown as DocumentNode<UserByTokenQuery, UserByTokenQueryVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"plannedWorkTime"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const StartWorkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"startWork"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateWorkRecordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createWorkRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<StartWorkMutation, StartWorkMutationVariables>;
export const EndWorkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"endWork"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateWorkRecordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWorkRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<EndWorkMutation, EndWorkMutationVariables>;
export const DeleteWorkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteWork"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteWorkRecordId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteWorkRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteWorkRecordId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteWorkMutation, DeleteWorkMutationVariables>;