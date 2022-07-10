import { createReactQueryHooks } from "@trpc/react";
import { AppRouter } from "@monorepo/api/src/router";

export const trpc = createReactQueryHooks<AppRouter>();
