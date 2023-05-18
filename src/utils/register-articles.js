"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
var openai_1 = require("openai");
var pg = require("pg");
var db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'ftssemanticsearch',
    password: 'postgres',
    port: 5432,
});
db.connect().then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Connected to database');
                return [4 /*yield*/, db.query("\n   \n  CREATE TABLE IF NOT EXISTS articles (\n    id SERIAL PRIMARY KEY,\n    title TEXT,\n    tags TEXT[],  -- an array of tags\n    content TEXT,\n    content_vector VECTOR(1536),\n    url VARCHAR(255) UNIQUE\n  );\n  \n")];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); }).catch(function (err) {
    console.log('Error connecting to database', err);
});
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
var articles = [
    {
        url: 'https://dev.to/josethz00/vector-databases-5df1',
        title: 'Vector Databases',
        tags: ['database', 'vector', 'pinecone', 'machine-learning', 'ai', 'data-science'],
        content: "With the rise of AI, vector databases are becoming more popular. But what exactly is a vector database and when should you use it?\n    What is a vector database?\n    Traditional search engines use full-text search, but NLPs like ChatGPT and Bing AI use semantic search or similarity search, a type of search that considers not only the characters match, but also the meaning of the words. This feature of semantic search is powered by vector databases.",
        vector_content: [],
    },
    {
        url: 'https://carlos.bueno.org/2013/03/internet-shape.html',
        title: 'The shape of internet is changing',
        tags: ['network', 'internet', 'history'],
        content: "\n    The internet is the largest and most interesting artifact created by mankind. Every country, every town, every no-longer-lonely island contains a piece of it. The rest lies under the waves. But which waves, which islands, in what order? That is the most interesting part of all. The patterns that shape the internet are both older and younger than you think.\n    Picture yourself in Sao Paulo, Brazil. You are writing an email to a friend in New Zealand, about 7,500 miles to the left. Or maybe you are calling her, or viewing a website she hosts. To the internet it is all the same: a temporary caravan of data packets circulating between points A & B. One measure of the power of an idea is how many different things can be expressed in terms of it.",
        vector_content: [],
    },
    {
        url: 'https://dev.to/marcusxavierr/guia-fundamental-da-programacao-orientada-a-objetos-parte-1-bel',
        title: 'Fundamental guide to object-oriented programming',
        tags: ['oriented-object-programming', 'oop', 'programming', 'computer-science', 'series'],
        content: "The aim of this series of posts is to cover the aspects that I consider most fundamental in object-oriented programming, and in today's article, we will start with the most basic concepts of this paradigm, including key principles such as encapsulation, inheritance, polymorphism, and abstraction.",
        vector_content: [],
    },
    {
        url: 'https://dev.to/marcusxavierr/clean-code-escolhendo-bons-nomes-feb',
        title: 'Clean Code - escolhendo bons nomes',
        content: "Clean Code is probably one of the most famous books on software development, likely every developer has heard the name of this book.\n\nThe idea of this series of articles is to serve as a small personal summary of what I saw in the book. I found several interesting insights while reading and noted them down so I could review them, but I felt that scattered notes with zero context aren't very good for reviewing.\n\nTherefore, I intend not only to share these insights but also to dwell on each of the tips presented and to include some code to contextualize what is being said.",
        tags: ['coding', 'clean-code'],
        vector_content: [],
    },
    {
        url: 'https://borretti.me/article/two-years-ocaml',
        title: 'Two Years of OCaml',
        content: "The other day I saw this post on OCaml discussed in Hacker News and Lobsters.\n\nAlmost two years ago I rewrote the Austral compiler from Standard ML to OCaml, so I thought I would share my thoughts on OCaml after using it in writing a complex software project, explaining what is good and what is bad and how it compares mainly to Haskell.",
        tags: ['functional-programming', 'ocaml'],
        vector_content: [],
    },
    {
        url: 'https://dev.to/marcusxavierr/brincando-com-a-funcao-reduce-4kjl',
        title: 'Playing with the Reduce Function',
        content: "\n\nIt's been a while since I've written a blog post. During this time, I've been studying Haskell and I found a very interesting function called fold, but this function is better known as reduce. What makes this function interesting is the fact that it contains a lot of information in just a few lines of code.\n\nImplementing a simple problem\nJust to show a bit of what reduce is capable of doing, let's imagine a hypothetical problem: You receive a shopping list that a customer made, and you need to add up all the values on that list.",
        tags: ['functional-programming'],
        vector_content: [],
    },
    {
        url: 'https://medium.com/@anddreluis/tecnologia-no-futebol-a-inova%C3%A7%C3%A3o-acaba-com-a-tradi%C3%A7%C3%A3o-cb435c3891df',
        title: 'Technology in Football - Innovation ends with tradition',
        content: "In the middle of 2022, a World Cup year, with Elon Musk building rockets, this question remains on the agenda: Does the technology employed in modern football end the tradition and excitement of the \"old football\"? The answer is not as simple as it seems, technology has been employed for a few years in a more intense way in football, features such as VAR, data analysis on portals like SofaScore, Footstats and even the technological arenas replacing the old stadiums make us, despite disagreements, have to agree that football is currently in constant transformation along with technology.",
        tags: ['data-analytics', 'tech-sport', 'data'],
        vector_content: [],
    },
    {
        url: 'https://overreacted.io/algebraic-effects-for-the-rest-of-us/',
        title: 'Algebraic Effects for the Rest of Us',
        content: "Algebraic effects in React can be described as a way to handle side effects in your components. They provide an approach to managing and isolating side-effects, leading to code that is easier to reason about and test. This methodology allows for more predictable and consistent state management, improving the overall robustness of a React application.",
        tags: ['front-end', 'javascript', 'react'],
        vector_content: [],
    },
    {
        url: 'https://www.joshwcomeau.com/javascript/the-const-deception/',
        title: 'The const Deception',
        content: 'Exploring the difference between assignment and mutation in JavaScript. The const keyword in JavaScript is used to declare a constant. Constants are often thought of as “variables that cannot change”',
        tags: ['javascript', 'computer-science'],
        vector_content: [],
    },
    {
        url: 'https://justsimply.dev/?utm_source=hackernewsletter&utm_medium=email&utm_term=cutting_room_floor',
        title: 'If someone is having to read your docs, it is not “simple”',
        content: "\n        As a developer, I often find myself knee-deep in a new technology - perhaps investigating a library, or learning a language. I am trying to frame new concepts in my head, applying my own data and architecture on the fly to the generic explanations in the docs. It is hard! Which is why it is jolting to read something like:\n        If someone's been driven to Google something you have written, they are stuck. Being stuck is, to one degree or another, upsetting and annoying",
        tags: ['documentation', 'communication'],
        vector_content: [],
    },
    {
        url: 'https://www.analyticsvidhya.com/blog/2020/08/top-4-sentence-embedding-techniques-using-python/',
        title: 'Top 4 Sentence Embedding Techniques Using Python',
        content: 'This article explores the top four techniques for generating sentence embeddings using Python. It covers methods such as Universal Sentence Encoder, BERT, GPT, and Doc2Vec, providing insights into their implementation and applications in natural language processing (NLP) and machine learning tasks.',
        tags: ['python', 'embeddings', 'nlp', 'machine-learning'],
        vector_content: [],
    },
    {
        url: 'https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/',
        title: 'Interactive Guide to Flexbox',
        content: 'This article provides an interactive guide to understanding and using Flexbox, a CSS layout system that helps create responsive and flexible web designs.',
        tags: ['css', 'front-end'],
        vector_content: [],
    },
    {
        url: 'https://engineering.fb.com/2021/07/29/data-infrastructure/linear-programming/',
        title: 'Linear Programming in Data Infrastructure',
        content: 'This article explores the application of linear programming in data infrastructure, showcasing how optimization techniques can enhance efficiency and decision-making in managing large-scale data systems.',
        tags: ['linear-programming', 'optimization', 'machine-learning'],
        vector_content: [],
    },
    {
        url: 'https://deepai.org/machine-learning-glossary-and-terms/linear-programming',
        title: 'Linear Programming - Machine Learning Glossary and Terms',
        content: 'This article serves as a comprehensive glossary and reference for understanding linear programming within the context of machine learning, covering key terms and concepts related to optimization and modeling.',
        tags: ['linear-programming', 'optimization', 'machine-learning'],
        vector_content: [],
    },
    {
        url: 'https://lemire.me/blog/2023/04/27/hotspot-performance-engineering-fails/?utm_source=programmingdigest&utm_medium&utm_campaign=1629',
        title: 'Hotspot Performance Engineering Fails',
        content: 'This article delves into common failures and mistakes encountered in hotspot performance engineering, discussing statistical analysis, optimization pitfalls, and architectural considerations.',
        tags: ['statistics', 'math', 'optimization', 'architecture'],
        vector_content: [],
    },
    {
        url: 'https://www.sitepoint.com/bun-javascript-runtime-introduction/',
        title: 'Bun - A JavaScript Runtime Introduction',
        content: 'This article offers an introduction to Bun, a JavaScript runtime that aims to optimize and streamline the execution of JavaScript code, providing insights into its features and advantages.',
        tags: ['javascript', 'runtime'],
        vector_content: [],
    },
    {
        url: 'https://www.freecodecamp.org/news/the-rise-of-the-data-engineer-91be18f1e603',
        title: 'The Rise of the Data Engineer',
        content: 'This article explores the growing role of data engineers and their significance in the field of data management and analysis, highlighting the skills, responsibilities, and career opportunities in this emerging domain.',
        tags: ['data-engineer', 'data'],
        vector_content: [],
    }
];
var seed = function () { return __awaiter(void 0, void 0, void 0, function () {
    var configuration, openai, i, article, embeddings, error_1, _i, articles_1, article, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                configuration = new openai_1.Configuration({
                    apiKey: process.env.OPENAI_API_KEY,
                });
                openai = new openai_1.OpenAIApi(configuration);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                i = 0;
                _b.label = 2;
            case 2:
                if (!(i < articles.length)) return [3 /*break*/, 5];
                article = articles[i];
                return [4 /*yield*/, openai.createEmbedding({
                        model: 'text-embedding-ada-002',
                        input: "".concat(article.title, "\n").concat(article.tags.join(' '), "\n").concat(article.content),
                    })];
            case 3:
                embeddings = _b.sent();
                article.vector_content = JSON.stringify((_a = embeddings.data.data[0]) === null || _a === void 0 ? void 0 : _a.embedding);
                _b.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_1 = _b.sent();
                console.log(error_1);
                throw error_1;
            case 7:
                _b.trys.push([7, 12, , 13]);
                _i = 0, articles_1 = articles;
                _b.label = 8;
            case 8:
                if (!(_i < articles_1.length)) return [3 /*break*/, 11];
                article = articles_1[_i];
                return [4 /*yield*/, db.query("\n                INSERT INTO articles (url, title, tags, content, content_vector)\n                VALUES ($1, $2, ARRAY[$3], $4, $5);\n                ", [article.url, article.title, article.tags, article.content, article.vector_content])];
            case 9:
                _b.sent();
                _b.label = 10;
            case 10:
                _i++;
                return [3 /*break*/, 8];
            case 11: return [3 /*break*/, 13];
            case 12:
                error_2 = _b.sent();
                console.log(error_2);
                throw error_2;
            case 13: return [2 /*return*/];
        }
    });
}); };
seed().then(function () {
    console.log('Finished seeding database');
    process.exit(0);
}).catch(function (err) {
    console.log('Error seeding database', err);
    process.exit(1);
});
