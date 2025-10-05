import {
  ProductFragrance,
  ProductStatus,
  ProductVolume,
} from "../enums/product.enum";
import { ObjectId } from "mongoose";

export interface Product {
  _id: ObjectId;
  productStatus: ProductStatus;
  productFragrance: ProductFragrance;
  productName: string;
  productBrand: string;
  productPrice: number;
  productStock: number;
  productSoldCount: number;
  productVolume: ProductVolume;
  productDesc?: string;
  productImages: string[];
  productView: number;
  productLikes: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface ProductInput {
  productStatus?: ProductStatus;
  productFragrance: ProductFragrance;
  productName: string;
  productBrand: string;
  productPrice: number;
  productStock: number;
  productVolume?: ProductVolume;
  productDesc?: string;
  productImages?: string[];
  productView?: number;
  productLikes?: number;
}
export interface ProductUpdateInput {
  _id: ObjectId;
  productStatus?: ProductStatus;
  productFragrance: ProductFragrance;
  productName?: string;
  productBrand?: string;
  productPrice?: number;
  productStock?: number;
  productVolume?: ProductVolume;
  productDesc?: string;
  productImages?: string[];
  productViews?: number;
  productLikes?: number;
}
