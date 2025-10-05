import mongoose, { Schema } from "mongoose";
import {
  ProductFragrance,
  ProductGender,
  ProductStatus,
  ProductType,
  ProductVolume,
} from "../libs/enums/product.enum";

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },

    productBrand: {
      type: String,
      required: true,
    },

    productDesc: {
      type: String,
      required: true,
    },

    productPrice: {
      type: Number,
      required: true,
    },

    productStock: {
      type: Number,
      required: true,
    },

    productGender: {
      type: String,
      enum: ProductGender,
    },

    productType: {
      type: String,
      enum: ProductType,
      required: true,
    },

    productFragrance: {
      type: String,
      enum: ProductFragrance,
      required: true,
    },

    productSoldCount: {
      type: Number,
      default: 0,
    },

    productVolume: {
      type: [Number],
      enum: ProductVolume,
      default: [ProductVolume.FIFTY],
    },

    productImages: {
      type: [String],
      default: [],
    },

    productStatus: {
      type: String,
      enum: ProductStatus,
      default: ProductStatus.ACTIVE,
    },

    productView: {
      type: Number,
      default: 0,
    },
    productLikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

productSchema.index({ productName: 1, productVolume: 1 }, { unique: true });

export default mongoose.model("Product", productSchema);
