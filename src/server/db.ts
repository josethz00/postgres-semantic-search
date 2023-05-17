/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import pg from 'pg';
import pgvector from 'node_modules/pgvector/src/pg';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
const db: pg.Client = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'ftssemanticsearch',
  password: 'postgres',
  port: 5432,
});

db.connect().then(async () => {
  console.log('Connected to database');
  await db.query(`
  
  CREATE TABLE IF NOT EXISTS articles (
    id SERIAL PRIMARY KEY,
    title TEXT,
    tags TEXT[],  -- an array of tags
    content TEXT,
    vector VECTOR(1536),
    tsvector_title TSVECTOR,  -- tsvector representation of title for full-text search
    tsvector_tags TSVECTOR   -- tsvector representation of tags for full-text search
  );

  `);

  await pgvector.registerType(db);
}).catch((err) => {
  console.log('Error connecting to database', err);
});

export { db };