import { Elysia, t } from "elysia";
import { helmet } from "elysia-helmet";
import { compression } from "elysia-compression";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";

import "./config/database/mongodb.config";
import { apiRoutes } from "./controller";

const app = new Elysia()
  .use(
    swagger({
      documentation: {
        info: {
          title: "Elysia Documentation",
          version: "1.0.0",
        },
        tags: [
          { name: "App", description: "General endpoints" },
          { name: "Auth", description: "Authentication endpoints" },
        ],
      },
    })
  )
  .listen(process.env.PORT || 5000);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
    exposeHeaders: process.env.CORS_EXPOSED_HEADERS || "*",
    allowedHeaders: process.env.CORS_ALLOWED_HEADER || "*",
    // @ts-ignore
    methods: (process.env.CORS_ALLOWED_METHODS! as HTTPMethod) || "*",
  })
);
app.use(helmet());
app.use(compression());
app.use(apiRoutes);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
