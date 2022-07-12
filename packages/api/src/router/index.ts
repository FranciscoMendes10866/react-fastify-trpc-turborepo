import * as trpc from "@trpc/server";
import { z } from "zod";

import type { Context } from "../context";

export const appRouter = trpc
  .router<Context>()
  .query("getNotes", {
    async resolve({ ctx }) {
      return await ctx.prisma.note.findMany();
    },
  })
  .mutation("createNote", {
    input: z.object({
      text: z.string().min(3).max(245),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.note.create({
        data: {
          text: input.text,
        },
      });
    },
  })
  .mutation("deleteNote", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.note.delete({
        where: {
          id: input.id,
        },
      });
    },
  });

export type AppRouter = typeof appRouter;
