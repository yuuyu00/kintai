import { QueryResolvers } from "../../gqlTypes";

export const userList: QueryResolvers["userList"] = async (
  {},
  {},
  { prisma }
) => {
  return prisma.user.findMany();
};

export const user: QueryResolvers["user"] = async ({}, { id }, { prisma }) => {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const userByToken: QueryResolvers["userByToken"] = async (
  {},
  { token },
  { prisma, firebaseApp }
) => {
  const decodedToken = await firebaseApp.auth().verifyIdToken(token);

  const user = await prisma.user.findFirst({
    where: { firebaseUid: decodedToken.uid },
  });

  return user;
};
