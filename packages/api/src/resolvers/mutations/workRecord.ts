import { MutationResolvers } from "../../gqlTypes";

export const createWorkRecord: MutationResolvers["createWorkRecord"] = async (
  {},
  { input },
  { prisma }
) => {
  return prisma.workRecord.create({
    data: { ...input, craetedAt: new Date().toISOString() },
  });
};

export const updateWorkRecord: MutationResolvers["updateWorkRecord"] = async (
  {},
  { input },
  { prisma }
) => {
  return prisma.workRecord.update({
    where: { id: input.id },
    data: {
      startAt: input.startAt || undefined,
      endAt: input.endAt,
      memo: input.memo,
    },
  });
};

export const deleteWorkRecord: MutationResolvers["deleteWorkRecord"] = async (
  {},
  { id },
  { prisma }
) => {
  return prisma.workRecord.delete({ where: { id } });
};
