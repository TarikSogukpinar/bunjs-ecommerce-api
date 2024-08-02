import { createElysia } from "../utils/createElysia";
import { ProductController } from "./product/product.controller";

export const apiRoutes = createElysia();

apiRoutes.use(ProductController);
