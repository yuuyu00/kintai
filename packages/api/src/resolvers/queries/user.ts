import { QueryResolvers } from "../../gqlTypes";

export const userList: QueryResolvers["userList"] = async (
  _res,
  _params,
  { prisma }
) => {
  // TODO: 権限がadminの場合のみ実行可能にする
  return prisma.user.findMany();
};

export const user: QueryResolvers["user"] = async (res, params, { user }) => {
  return user;
};

export const userByToken: QueryResolvers["userByToken"] = async (
  _res,
  { token },
  { prisma, firebaseApp }
) => {
  const decodedToken = await firebaseApp.auth().verifyIdToken(token);

  return prisma.user.findFirst({
    where: { firebaseUid: decodedToken.uid },
  });
};
