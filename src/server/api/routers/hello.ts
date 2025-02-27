import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const helloRouter = createTRPCRouter({
  // http://localhost:3000/api/trpc/hello.helloWorld
  helloWorld: publicProcedure.query(() => {
    return {
      greeting: `Hello World`,
    };
  }),
  helloText: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
});
