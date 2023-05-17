import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAll: publicProcedure.input(
    z.object({
      title: z.string()
    })
  ).query(({ ctx, input }) => {
    return ctx.db.query(
      `
      SELECT id, title,
        ts_rank(tsvector_title, to_tsquery('english', ${input.title})) AS title_rank,
        ts_rank(tsvector_tags, to_tsquery('english', ${input.title})) AS tags_rank,
        vector <> ARRAY[0.1, 0.2, ..., 0.512] AS distance
      FROM articles
      WHERE tsvector_title @@ to_tsquery('english', ${input.title})
      OR tsvector_tags @@ to_tsquery('english', ${input.title})
      ORDER BY (title_rank + tags_rank) DESC, distance ASC
      LIMIT 10;
      `
    )
  }),
});
