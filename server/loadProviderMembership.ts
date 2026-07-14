import { prisma } from "./prisma";

export const loadProviderMembership = (userId: string) =>
  prisma.membership.findFirst({
    where: { userId },
    include: { organization: true },
  });
