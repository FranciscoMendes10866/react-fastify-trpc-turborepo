import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "@monorepo/api";

export const trpc = createReactQueryHooks<AppRouter>();
