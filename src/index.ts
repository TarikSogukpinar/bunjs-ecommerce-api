import { Elysia } from "elysia";
import { helmet } from "elysia-helmet";
import { compression } from "elysia-compression";
import { cors } from "@elysiajs/cors";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .listen(process.env.PORT as string | number);

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

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
