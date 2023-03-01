import { MutationResolvers } from "../../gqlTypes";

export const createUser: MutationResolvers["createUser"] = async (
  {},
  { input },
  { prisma }
) => {
  return prisma.user.create({ data: input });
};
