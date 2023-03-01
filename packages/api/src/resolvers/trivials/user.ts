import { UserResolvers } from "../../gqlTypes";

export const User: UserResolvers = {
  workRecords: (parent, {}, context) => {
    return context.prisma.workRecord.findMany({ where: { userId: parent.id } });
  },
};
