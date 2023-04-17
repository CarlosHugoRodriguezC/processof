import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "./root";
import SuperJSON from "superjson";
import { Session } from "next-auth";
import { prisma } from '../db';

export const ssgInit = async (
 session: Session | null,
) => {
  

  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: {
      session,
      prisma
    },
    transformer: SuperJSON,
  });

  return ssg
};
