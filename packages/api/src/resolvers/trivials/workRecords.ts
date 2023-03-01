import { WorkRecordResolvers } from "../../gqlTypes";

export const WorkRecord: WorkRecordResolvers = {
  user: async (parent, {}, context) => {
    const user = await context.prisma.user.findUnique({
      where: { id: parent.userId },
    });

    if (!user) {
      throw new Error("User by WorkRecord not found");
    }

    return user;
  },
};
