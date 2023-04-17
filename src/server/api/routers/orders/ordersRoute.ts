import { paginationInput } from "../../inputs/shared";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { createOrderInput } from "./inputs";

const getAll = protectedProcedure
  .input(paginationInput)
  .query(async ({ ctx }) => {
    return ctx.prisma.order.findMany({
      include: {
        productionLine: true,
        createdBy: true,
        updatedBy: true,
      },
    });
  });

const createOne = protectedProcedure
  .input(createOrderInput)
  .mutation(async ({ ctx, input }) => {
    const now = new Date();
    const productionLine = await ctx.prisma.productionLine.create({
      data: {
        name: `Production Line ${input.customerName}`,
        description: `Production Line for ${input.customerName}`,
      },
    });

    return ctx.prisma.order.create({
      data: {
        customerEmail: input.customerEmail,
        customerName: input.customerName,
        status: "IN_PROGRESS",
        productionLine: {
          connect: {
            id: productionLine.id,
          },
        },
        createdBy: {
          connect: {
            id: ctx.session.user.id,
          },
        },
        updatedBy: {
          connect: {
            id: ctx.session.user.id,
          },
        },
      },
    });
  });

export const ordersRouter = createTRPCRouter({
  getAll,
  createOne,
});
