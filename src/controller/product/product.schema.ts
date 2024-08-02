import { IProduct } from "../../types/product";
import { Document, model, Schema } from "mongoose";

export type ProductDocument = IProduct & Document;

const schema = new Schema<ProductDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    stock: {
      type: Number,
      required: true,
      max: 100,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

schema.pre("save", function (next) {
  console.log("pre save", this.name);
  next();
});

export default model<ProductDocument>("product", schema);
