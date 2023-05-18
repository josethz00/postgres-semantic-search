/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import pg from 'pg';

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
    content_vector VECTOR(1536),
    url VARCHAR(255) UNIQUE
  );

  `);
}).catch((err) => {
  console.log('Error connecting to database', err);
});

export { db };