import { z } from "zod";
import { Configuration, OpenAIApi } from "openai";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { env } from "~/env.mjs";

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
  ).query(async ({ ctx, input }) => {
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
            SELECT id, title, content, url,
                content_vector <=> CAST($1 AS VECTOR(1536)) AS distance_content
            FROM articles
        ) sub
        ORDER BY distance_content ASC
        LIMIT 10;
        `,
        [JSON.stringify(embeddings.data.data[0]?.embedding)]
    );

    } catch (error) {
      console.log(error);
      throw error;
    }
  }),
});
