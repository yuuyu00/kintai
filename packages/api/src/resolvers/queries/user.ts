import { QueryResolvers } from "../../gqlTypes";

export const userList: QueryResolvers["userList"] = async (
  res,
  parent,
  { prisma }
) => {
  return prisma.user.findMany();
};

export const user: QueryResolvers["user"] = async (res, params, { prisma }) => {
  const user = await prisma.user.findUnique({ where: { id: params.id } });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const userByToken: QueryResolvers["userByToken"] = async (
  res,
  params,
  { prisma, firebaseApp }
) => {
  const decodedToken = await firebaseApp.auth().verifyIdToken(params.token);

  const user = await prisma.user.findFirst({
    where: { firebaseUid: decodedToken.uid },
  });

  return user;
};
