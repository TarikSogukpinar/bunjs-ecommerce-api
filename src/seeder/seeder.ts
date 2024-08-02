import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import Product, { ProductDocument } from "../controller/product/product.schema";

const mongoURI = process.env.MONGODB_URI as string;

mongoose
  .connect(mongoURI)
  .then(async () => {
    console.log("Connected to MongoDB");

    await Product.deleteMany({});

    for (let i = 0; i < 1000; i++) {
      const product = new Product({
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        category: faker.commerce.department(),
        stock: faker.datatype.number({ min: 0, max: 100 }),
      });

      await product.save();
    }

    console.log("Database populated with fake data");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
