import { t } from "elysia";
import { APIResponse } from "../../types/api/api-response.js";
import { IProduct } from "../../types/product.js";
import { ProductDocumentServices, ProductServices } from "./product.service.js";
import { createElysia } from "../../utils/createElysia.js";

const _productServices: ProductDocumentServices = new ProductServices();

export const ProductController = createElysia({ prefix: "/products" }).guard(
  (app) =>
    app
      .get("/", async (): Promise<APIResponse<IProduct[]>> => {
        console.log("@GET /products");
        const products = await _productServices.getAll();

        return {
          success: true,
          data: products,
        };
      })

      .post(
        "/",
        async ({ body }): Promise<APIResponse<IProduct>> => {
          const { name, price, description, category, stock } = body;

          const newProduct = await _productServices.create({
            name,
            price,
            description,
            category,
            stock,
          });

          return {
            success: true,
            data: newProduct,
          };
        },
        {
          body: t.Object({
            name: t.String(),
            price: t.Number(),
            description: t.String(),
            category: t.String(),
            stock: t.Number(),
          }),
        }
      )

      .put(
        "/:id",
        async ({ params: { id }, body }): Promise<APIResponse<IProduct>> => {
          if (!id) throw new Error("Id is required");

          const updatedProduct = await _productServices.update(id, body);

          return {
            success: true,
            data: updatedProduct,
          };
        },
        {
          body: t.Object({
            name: t.Optional(t.String()),
            price: t.Optional(t.Number()),
            description: t.Optional(t.String()),
            category: t.Optional(t.String()),
            stock: t.Optional(t.Number()),
          }),
        }
      )

      .delete(
        "/:id",
        async ({ params: { id } }): Promise<APIResponse<IProduct>> => {
          const deletedProduct = await _productServices.delete(id);

          return {
            success: true,
            data: deletedProduct,
          };
        }
      )
);
