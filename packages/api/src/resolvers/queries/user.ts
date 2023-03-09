import { QueryResolvers } from "../../gqlTypes";

export const userList: QueryResolvers["userList"] = async (
  res,
  parent,
  { prisma }
) => {
  // TODO: 権限がadminの場合のみ実行可能にする
  return prisma.user.findMany();
};

export const user: QueryResolvers["user"] = async (res, params, { user }) => {
  return user;
};
