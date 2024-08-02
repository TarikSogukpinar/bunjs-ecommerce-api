import { Model } from "mongoose";
import Product, { ProductDocument } from "./product.schema";
import { ProductDTO } from "../../types/product";

export class ProductServices {
  private readonly _productSchema: Model<ProductDocument>;

  constructor() {
    this._productSchema = Product;
  }

  async get(id: string): Promise<ProductDocument> {
    const product = await this._productSchema.findById(id);
    if (!product) throw new Error(`Product not found with id ${id}`);

    return product;
  }

  async getAll(): Promise<ProductDocument[]> {
    const products = await this._productSchema.find();

    return products;
  }

  async create(data: ProductDTO): Promise<ProductDocument> {
    console.log("@POST: /products", data);

    const newProduct = new this._productSchema(data);
    newProduct.name = data.name;
    newProduct.price = data.price;
    newProduct.description = data.description;
    newProduct.category = data.category;
    newProduct.stock = data.stock;

    const returnedProduct = await newProduct.save();

    return returnedProduct;
  }

  async update(
    id: string,
    data: Partial<ProductDTO>
  ): Promise<ProductDocument> {
    console.log("@PUT: /products");

    const updateProduct = await this._productSchema.findById(id);

    if (!updateProduct) throw new Error(`Product not found with id ${id}`);

    console.log("updateProduct", updateProduct);

    data.name ? (updateProduct.name = data.name) : null;
    data.price ? (updateProduct.price = data.price) : null;
    data.description ? (updateProduct.description = data.description) : null;
    data.category ? (updateProduct.category = data.category) : null;
    data.stock ? (updateProduct.stock = data.stock) : null;

    const returnedProduct = await updateProduct.save();

    return returnedProduct;
  }

  async delete(id: string): Promise<ProductDocument> {
    console.log("@DELETE: /products");

    const deletedProduct = await this._productSchema.findByIdAndDelete(id);

    if (!deletedProduct) throw new Error(`Product not found with id ${id}`);

    return deletedProduct;
  }
}

export type ProductDocumentServices = ProductServices;
