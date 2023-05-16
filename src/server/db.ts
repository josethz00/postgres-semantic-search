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

db.connect().then(() => {
  console.log('Connected to database');
  db.query(`
  
  CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title TEXT,
    tags TEXT[],  -- an array of tags
    content TEXT,
    vector VECTOR(512),
    tsvector_title TSVECTOR,  -- tsvector representation of title for full-text search
    tsvector_tags TSVECTOR   -- tsvector representation of tags for full-text search
  );

  `).then(() => {
    console.log('table')
  })
}).catch((err) => {
  console.log('Error connecting to database', err);
});

export { db };