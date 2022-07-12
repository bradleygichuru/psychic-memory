// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import authRouter from "./auth";
import voterRouter from "./voter";
export const appRouter = createRouter()
  .transformer(superjson)
  .merge("voter.",voterRouter)
  .merge("auth.", authRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
