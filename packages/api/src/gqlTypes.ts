import { GraphQLResolveInfo } from 'graphql';
import { User as UserModel, WorkRecord as WorkRecordModel } from '@prisma/client/index.d';
import { Context } from './context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateUserInput: CreateUserInput;
  CreateWorkRecordInput: CreateWorkRecordInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: never;
  NoopInput: NoopInput;
  NoopPayload: ResolverTypeWrapper<NoopPayload>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  UpdateWorkRecordInput: UpdateWorkRecordInput;
  User: ResolverTypeWrapper<UserModel>;
  WorkRecord: ResolverTypeWrapper<WorkRecordModel>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  CreateUserInput: CreateUserInput;
  CreateWorkRecordInput: CreateWorkRecordInput;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  Node: never;
  NoopInput: NoopInput;
  NoopPayload: NoopPayload;
  Query: {};
  String: Scalars['String'];
  UpdateWorkRecordInput: UpdateWorkRecordInput;
  User: UserModel;
  WorkRecord: WorkRecordModel;
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  createWorkRecord?: Resolver<ResolversTypes['WorkRecord'], ParentType, ContextType, RequireFields<MutationCreateWorkRecordArgs, 'input'>>;
  deleteWorkRecord?: Resolver<ResolversTypes['WorkRecord'], ParentType, ContextType, RequireFields<MutationDeleteWorkRecordArgs, 'id'>>;
  noop?: Resolver<Maybe<ResolversTypes['NoopPayload']>, ParentType, ContextType, Partial<MutationNoopArgs>>;
  updateWorkRecord?: Resolver<ResolversTypes['WorkRecord'], ParentType, ContextType, RequireFields<MutationUpdateWorkRecordArgs, 'input'>>;
}>;

export type NodeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = ResolversObject<{
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
}>;

export type NoopPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['NoopPayload'] = ResolversParentTypes['NoopPayload']> = ResolversObject<{
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  node?: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType, RequireFields<QueryNodeArgs, 'id'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userByToken?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserByTokenArgs, 'token'>>;
  userList?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  plannedWorkTime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  workRecords?: Resolver<Array<ResolversTypes['WorkRecord']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkRecordResolvers<ContextType = Context, ParentType extends ResolversParentTypes['WorkRecord'] = ResolversParentTypes['WorkRecord']> = ResolversObject<{
  craetedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  endAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  memo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  startAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  NoopPayload?: NoopPayloadResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  WorkRecord?: WorkRecordResolvers<ContextType>;
}>;

