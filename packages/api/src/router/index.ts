import * as trpc from "@trpc/server";
import { z } from "zod";

import { Context } from "../context";

type User = {
  id: string;
  name: string;
  bio?: string;
};

const users: Record<string, User> = {};

export const appRouter = trpc
  .router<Context>()
  .query("getUserById", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      return users[input.id]; // input type is string
    },
  })
  .mutation("createUser", {
    // validate input with Zod
    input: z.object({
      name: z.string().min(3),
      bio: z.string().max(142).optional(),
    }),
    async resolve({ input }) {
      const id = Date.now().toString();
      const user: User = { id, ...input };
      users[user.id] = user;
      return user;
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
