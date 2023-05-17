import { z } from "zod";
import { Configuration, OpenAIApi } from "openai";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { env } from "~/env.mjs";
import pgvector from 'node_modules/pgvector/src/pg';

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
  ).mutation(async ({ ctx, input }) => {
    const configuration = new Configuration({
      apiKey: env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    try {

      const embeddings = await openai.createEmbedding({
        model: 'text-embedding-ada-002',
        input: input.title,
      });
      
      return ctx.db.query(
        `
        SELECT *
        FROM (
            SELECT id, title,
                ts_rank(tsvector_title, to_tsquery('english', $1)) AS title_rank,
                ts_rank(tsvector_tags, to_tsquery('english', $1)) AS tags_rank,
                vector <=> CAST($2 AS VECTOR(1536)) AS distance
            FROM articles
            WHERE tsvector_title @@ to_tsquery('english', $1)
            OR tsvector_tags @@ to_tsquery('english', $1)
        ) sub
        ORDER BY (title_rank + tags_rank) DESC, distance ASC
        LIMIT 10;
        `,
        [input.title.replace(/\s+/g, ' & '), pgvector.toSql(embeddings.data.data[0]?.embedding)]
    );

    } catch (error) {
      console.log(error);
      throw error;
    }
  }),
});
