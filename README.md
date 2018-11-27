# URL shortener

A url shortener prototype written in TypeScript. Fastify is used.

Reasons not to use this in production: 
- A showcase, a toy. 
- URL kv storage is in-memory.
  - which means there is no persistance. 
  - However, redis could be implemented.
- Code not commented, but self-document enough. 
- Feature incomplete, not production-ready at all.
- No handling of error at all.
- I don't know. I wrote this in a day just for fun.

Use at your own risks.

## Environment variables
- ADDR=127.0.0.1
- PORT=8080

## Instructions

To run, 
```bash
$ npm i
$ npm run dev
```
