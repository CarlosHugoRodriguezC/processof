import { paginationInput } from "../../inputs/shared";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../trpc";
import { deleteUserInput, getOneInput, updateUserInput } from "./inputs";

const getAll = publicProcedure
  .input(paginationInput)
  .query(({ ctx, input }) => {
    return ctx.prisma.user.findMany({
      skip: (input.page - 1) * input.perPage,
      take: input.perPage,
    });
  });

const getOne = protectedProcedure.input(getOneInput).query(({ ctx, input }) => {
  return ctx.prisma.user.findUnique({
    where: {
      id: input.id,
    },
  });
});

const updateOne = protectedProcedure
  .input(updateUserInput)
  .mutation(({ ctx, input }) => {
    return ctx.prisma.user.update({
      where: {
        id: input.id,
      },
      data: {
        email: input.email,
        name: input.name,
        role: input.role,
      },
    });
  });

const deleteOne = protectedProcedure
  .input(deleteUserInput)
  .mutation(({ ctx, input }) => {
    return ctx.prisma.user.update({
      where: {
        id: input.id,
      },
      data: {
        deleted: true,
      },
    });
  });

export const usersRouter = createTRPCRouter({
  getAll,
  getOne,
  updateOne,
  deleteOne,
});
