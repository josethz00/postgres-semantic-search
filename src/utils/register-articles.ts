import { Configuration, OpenAIApi } from "openai";
import * as pg from 'pg'

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
    title_vector VECTOR(1536),
    tags TEXT[],  -- an array of tags
    tags_vector VECTOR(1536),
    content TEXT,
    content_vector VECTOR(1536),
    url VARCHAR(255) UNIQUE
  );
  
`);
}).catch((err) => {
  console.log('Error connecting to database', err);
});

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const articles = [
    {
        url: 'https://dev.to/josethz00/vector-databases-5df1',
        title: 'Vector Databases',
        tags: ['database', 'vector', 'pinecone', 'machine-learning', 'ai', 'data-science'],
        content:
    `With the rise of AI, vector databases are becoming more popular. But what exactly is a vector database and when should you use it?
    What is a vector database?
    Traditional search engines use full-text search, but NLPs like ChatGPT and Bing AI use semantic search or similarity search, a type of search that considers not only the characters match, but also the meaning of the words. This feature of semantic search is powered by vector databases.`,
        vector_content: [],
        vector_title: 'Vector Databases',
        vector_tags: 'database vector pinecone machine-learning ai data-science',
    },
    {
        url: 'https://carlos.bueno.org/2013/03/internet-shape.html',
        title: 'The shape of internet is changing',
        tags: ['network', 'internet', 'history'],
        content:
    `
    The internet is the largest and most interesting artifact created by mankind. Every country, every town, every no-longer-lonely island contains a piece of it. The rest lies under the waves. But which waves, which islands, in what order? That is the most interesting part of all. The patterns that shape the internet are both older and younger than you think.
    Picture yourself in Sao Paulo, Brazil. You are writing an email to a friend in New Zealand, about 7,500 miles to the left. Or maybe you are calling her, or viewing a website she hosts. To the internet it is all the same: a temporary caravan of data packets circulating between points A & B. One measure of the power of an idea is how many different things can be expressed in terms of it.`,
        vector_content: [],
        vector_title: [],
        vector_tags: [],
    },
    {
        url: 'https://dev.to/marcusxavierr/guia-fundamental-da-programacao-orientada-a-objetos-parte-1-bel',
        title: 'Fundamental guide to object-oriented programming',
        tags: ['oriented-object-programming', 'oop', 'programming', 'computer-science', 'series'],
        content: 
    `The aim of this series of posts is to cover the aspects that I consider most fundamental in object-oriented programming, and in today's article, we will start with the most basic concepts of this paradigm, including key principles such as encapsulation, inheritance, polymorphism, and abstraction.`,
        vector_content: [],
        vector_title: [],
        vector_tags: [],
    },
    {
        url: 'https://dev.to/marcusxavierr/clean-code-escolhendo-bons-nomes-feb',
        title: 'Clean Code - escolhendo bons nomes',
        content: 
`Clean Code is probably one of the most famous books on software development, likely every developer has heard the name of this book.

The idea of this series of articles is to serve as a small personal summary of what I saw in the book. I found several interesting insights while reading and noted them down so I could review them, but I felt that scattered notes with zero context aren't very good for reviewing.

Therefore, I intend not only to share these insights but also to dwell on each of the tips presented and to include some code to contextualize what is being said.`,
        tags: ['coding', 'clean-code'],
        vector_content: [],
        vector_title: [],
        vector_tags: [],
    },
    {
        url: 'https://borretti.me/article/two-years-ocaml',
        title: 'Two Years of OCaml',
        content: 
`The other day I saw this post on OCaml discussed in Hacker News and Lobsters.

Almost two years ago I rewrote the Austral compiler from Standard ML to OCaml, so I thought I would share my thoughts on OCaml after using it in writing a complex software project, explaining what is good and what is bad and how it compares mainly to Haskell.`,
        tags: ['functional-programming', 'ocaml'],
        vector_content: [],
        vector_title: [],
        vector_tags: [],
    },
    {
        url: 'https://dev.to/marcusxavierr/brincando-com-a-funcao-reduce-4kjl',
        title: 'Playing with the Reduce Function',
        content: 
`

It's been a while since I've written a blog post. During this time, I've been studying Haskell and I found a very interesting function called fold, but this function is better known as reduce. What makes this function interesting is the fact that it contains a lot of information in just a few lines of code.

Implementing a simple problem
Just to show a bit of what reduce is capable of doing, let's imagine a hypothetical problem: You receive a shopping list that a customer made, and you need to add up all the values on that list.`,
        tags: ['functional-programming'],
        vector_content: [],
        vector_title: [],
        vector_tags: [],
    },
    {
        url: 'https://medium.com/@anddreluis/tecnologia-no-futebol-a-inova%C3%A7%C3%A3o-acaba-com-a-tradi%C3%A7%C3%A3o-cb435c3891df',
        title: 'Technology in Football - Innovation ends with tradition',
        content: 
`In the middle of 2022, a World Cup year, with Elon Musk building rockets, this question remains on the agenda: Does the technology employed in modern football end the tradition and excitement of the "old football"? The answer is not as simple as it seems, technology has been employed for a few years in a more intense way in football, features such as VAR, data analysis on portals like SofaScore, Footstats and even the technological arenas replacing the old stadiums make us, despite disagreements, have to agree that football is currently in constant transformation along with technology.`,
        tags: ['data-analytics', 'tech-sport','data'],
        vector_content: [],
        vector_title: [],
        vector_tags: [],
    },
    {
        url: 'https://overreacted.io/algebraic-effects-for-the-rest-of-us/',
        title: 'Algebraic Effects for the Rest of Us',
        content: 
`Algebraic effects in React can be described as a way to handle side effects in your components. They provide an approach to managing and isolating side-effects, leading to code that is easier to reason about and test. This methodology allows for more predictable and consistent state management, improving the overall robustness of a React application.`,
        tags: ['front-end', 'javascript', 'react'],
        vector_content: [],
        vector_title: [],
        vector_tags: [],
    },
    {
        url: 'https://www.joshwcomeau.com/javascript/the-const-deception/',
        title: 'The const Deception',
        content: 'Exploring the difference between assignment and mutation in JavaScript. The const keyword in JavaScript is used to declare a constant. Constants are often thought of as “variables that cannot change”',
        tags: ['javascript', 'computer-science'],
        vector_content: [],
        vector_title: [],
        vector_tags: [],
    },
    {
        url: 'https://justsimply.dev/?utm_source=hackernewsletter&utm_medium=email&utm_term=cutting_room_floor',
        title: 'If someone is having to read your docs, it is not “simple”',
        content: `
        As a developer, I often find myself knee-deep in a new technology - perhaps investigating a library, or learning a language. I am trying to frame new concepts in my head, applying my own data and architecture on the fly to the generic explanations in the docs. It is hard! Which is why it is jolting to read something like:
        If someone's been driven to Google something you have written, they are stuck. Being stuck is, to one degree or another, upsetting and annoying`,
        tags: ['documentation', 'communication'],
        vector_content: [],
        vector_title: [],
        vector_tags: [],
    },
    {
        url: 'https://www.analyticsvidhya.com/blog/2020/08/top-4-sentence-embedding-techniques-using-python/',
        title: 'Top 4 Sentence Embedding Techniques Using Python',
        content: 'This article explores the top four techniques for generating sentence embeddings using Python. It covers methods such as Universal Sentence Encoder, BERT, GPT, and Doc2Vec, providing insights into their implementation and applications in natural language processing (NLP) and machine learning tasks.',
        tags: ['python', 'embeddings', 'nlp', 'machine-learning'],
        vector_content: [],
        vector_title: [],
        vector_tags: [],
    },
    {
        url: 'https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/',
        title: 'Interactive Guide to Flexbox',
        content: 'This article provides an interactive guide to understanding and using Flexbox, a CSS layout system that helps create responsive and flexible web designs.',
        tags: ['css', 'front-end'],
        vector_content: [],
        vector_title: [],
        vector_tags: [],
    },
    {
        url: 'https://engineering.fb.com/2021/07/29/data-infrastructure/linear-programming/',
        title: 'Linear Programming in Data Infrastructure',
        content: 'This article explores the application of linear programming in data infrastructure, showcasing how optimization techniques can enhance efficiency and decision-making in managing large-scale data systems.',
        tags: ['linear-programming', 'optimization', 'machine-learning'],
        vector_content: [],
        vector_title: [],
        vector_tags: [],
    },
    {
        url: 'https://deepai.org/machine-learning-glossary-and-terms/linear-programming',
        title: 'Linear Programming - Machine Learning Glossary and Terms',
        content: 'This article serves as a comprehensive glossary and reference for understanding linear programming within the context of machine learning, covering key terms and concepts related to optimization and modeling.',
        tags: ['linear-programming', 'optimization', 'machine-learning'],
        vector_content: [],
        vector_title: [],
        vector_tags: [],
    },
    {
        url: 'https://lemire.me/blog/2023/04/27/hotspot-performance-engineering-fails/?utm_source=programmingdigest&utm_medium&utm_campaign=1629',
        title: 'Hotspot Performance Engineering Fails',
        content: 'This article delves into common failures and mistakes encountered in hotspot performance engineering, discussing statistical analysis, optimization pitfalls, and architectural considerations.',
        tags: ['statistics', 'math', 'optimization', 'architecture'],
        vector_content: [],
        vector_title: [],
        vector_tags: [],
    },
    {
        url: 'https://www.sitepoint.com/bun-javascript-runtime-introduction/',
        title: 'Bun - A JavaScript Runtime Introduction',
        content: 'This article offers an introduction to Bun, a JavaScript runtime that aims to optimize and streamline the execution of JavaScript code, providing insights into its features and advantages.',
        tags: ['javascript', 'runtime'],
        vector_content: [],
        vector_title: [],
        vector_tags: [],
    },
    {
        url: 'https://www.freecodecamp.org/news/the-rise-of-the-data-engineer-91be18f1e603',
        title: 'The Rise of the Data Engineer',
        content: 'This article explores the growing role of data engineers and their significance in the field of data management and analysis, highlighting the skills, responsibilities, and career opportunities in this emerging domain.',
        tags: ['data-engineer', 'data'],
        vector_content: [],
        vector_title: [],
        vector_tags: [],
    }
];

const seed = async () => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    try {
        for (let i = 0; i < articles.length; i++) {
            const article = articles[i];
            const contentEmbeddings = await openai.createEmbedding({
                model: 'text-embedding-ada-002',
                input: article?.content,
            });
            article?.vector_content = JSON.stringify(contentEmbeddings.data.data[0]?.embedding) as any;

            const titleEmbeddings = await openai.createEmbedding({
                model: 'text-embedding-ada-002',
                input: article?.content,
            });
            article?.vector_title = JSON.stringify(titleEmbeddings.data.data[0]?.embedding) as any;

            const tagsEmbeddings = await openai.createEmbedding({
                model: 'text-embedding-ada-002',
                input: article?.content,
            });
            article?.vector_tags = JSON.stringify(tagsEmbeddings.data.data[0]?.embedding) as any;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }

    try {
        for (const article of articles) {
            await db.query(
                `
                INSERT INTO articles (url, title, tags, content, title_vector, tags_vector, content_vector)
                VALUES ($1, $2, ARRAY[$3], $4, $5, $6, $7);
                `,
                [article.url, article.title, article.tags, article.content, article.vector_content, article.vector_tags, article.vector_title]
            );
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

seed().then(() => {
    console.log('Finished seeding database');
    process.exit(0);
}).catch((err) => {
    console.log('Error seeding database', err);
    process.exit(1);
});