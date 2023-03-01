import { QueryResolvers } from "../../gqlTypes";

export const workRecordList: QueryResolvers["workRecordList"] = async (
  {},
  {},
  { prisma }
) => {
  return prisma.workRecord.findMany();
};

export const workRecord: QueryResolvers["workRecord"] = async (
  {},
  { id },
  { prisma }
) => {
  const workRecord = await prisma.workRecord.findUnique({ where: { id } });

  if (!workRecord) {
    throw new Error("WorkRecord not found");
  }

  return workRecord;
};
