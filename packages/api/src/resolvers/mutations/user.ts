import { MutationResolvers } from "../../gqlTypes";

export const createUser: MutationResolvers["createUser"] = async (
  {},
  { input },
  { prisma, firebaseApp }
) => {
  const decodedToken = await firebaseApp.auth().verifyIdToken(input.token);

  return prisma.user.create({
    data: {
      name: input.name,
      plannedWorkTime: input.plannedWorkTime,
      firebaseUid: decodedToken.uid,
    },
  });
};
