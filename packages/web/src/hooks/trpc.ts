import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "@monorepo/api/src/router";

export const trpc = createReactQueryHooks<AppRouter>();
