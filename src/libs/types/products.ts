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
  productPrice: number;
  productLeftCount: number;
  productSoldCount: number;
  productVolume: ProductVolume;
  productDesc?: string;
  productImages: string[];
  productView: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface ProductInput {
  productStatus?: ProductStatus;
  productFragrance: ProductFragrance;
  productName: string;
  productPrice: number;
  productLeftCount: number;
  productVolume?: ProductVolume;
  productDesc?: string;
  productImages?: string[];
  productView?: number;
}
export interface ProductUpdateInput {
  _id: ObjectId;
  productStatus?: ProductStatus;
  productFragrance: ProductFragrance;
  productName?: string;
  productPrice?: number;
  productLeftCount?: number;
  productVolume?: ProductVolume;
  productDesc?: string;
  productImages?: string[];
  productViews?: number;
}
