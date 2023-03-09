import { MutationResolvers } from "../../gqlTypes";

export const createWorkRecord: MutationResolvers["createWorkRecord"] = async (
  _res,
  { input },
  { prisma, user }
) => {
  if (!user) throw new Error("Not authorized.");

  return prisma.workRecord.create({
    data: { ...input, craetedAt: new Date().toISOString(), userId: user.id },
  });
};

export const updateWorkRecord: MutationResolvers["updateWorkRecord"] = async (
  _res,
  { input },
  { prisma, user }
) => {
  if (!user) throw new Error("Must be logged in.");

  const workRecord = await prisma.workRecord.findUnique({
    where: { id: input.id },
  });

  if (!workRecord) throw new Error("WorkRecord not found.");
  if (workRecord.userId !== user.id) throw new Error("Not authorized.");

  return prisma.workRecord.update({
    where: { id: workRecord.id },
    data: {
      startAt: input.startAt || undefined,
      endAt: input.endAt,
      memo: input.memo,
    },
  });
};

export const deleteWorkRecord: MutationResolvers["deleteWorkRecord"] = async (
  _res,
  { id },
  { prisma, user }
) => {
  if (!user) throw new Error("Must be logged in.");

  const workRecord = await prisma.workRecord.findUnique({ where: { id } });

  if (!workRecord) throw new Error("WorkRecord not found.");
  if (workRecord.userId !== user.id) throw new Error("Not authorized.");

  return prisma.workRecord.delete({ where: { id: workRecord.id } });
};
