import { Elysia } from "elysia";
import postRoutes from "./routes/posts"
import {swagger} from "@elysiajs/swagger"

const app = new Elysia()
    app
        .use(swagger())
    .group('/api', (app)=> app.use(postRoutes))
        .listen({
           port: process.env.PORT || 3049,
            // Error of unrecognized address solved by specifying
            hostname: process.env.HOSTNAME || 'localhost',
        })


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}/swagger`
);
