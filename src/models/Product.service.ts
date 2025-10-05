import ProductModel from "../schema/Product.model";
import Errors, { HttpCode, Message } from "../libs/Errors";
import {
  Product,
  ProductInput,
  ProductUpdateInput,
} from "../libs/types/products";
import { shapeIntoMongooseObjectId } from "../libs/config";
import { T } from "../libs/types/common";

class ProductService {
  private readonly productModel;
  constructor() {
    this.productModel = ProductModel;
  }

  /* SSR */
  public async getAllProducts(): Promise<Product[]> {
    const result = await this.productModel.find().exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    return result as unknown as Product[];
  }

  public async createNewProduct(input: ProductInput): Promise<Product> {
    try {
      const result = await this.productModel.create(input);
      return result.toObject() as Product;
    } catch (error) {
      console.error("Error , model: CreateNewProduct", error);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  public async updateChoosenProduct(
    id: string,
    input: ProductUpdateInput
  ): Promise<Product> {
    // string => ObjectId
    id = shapeIntoMongooseObjectId(id);

    const result = await this.productModel
      .findByIdAndUpdate(id, input, { new: true })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.UPDATE_FAILED);
    return result as unknown as Product;
  }

  public async deleteChoosenProduct(id: string): Promise<void> {
    id = shapeIntoMongooseObjectId(id);
    const result = await this.productModel
      .findByIdAndDelete({ _id: id })
      .exec();
    return console.log("Product Deleted:", id);
  }
}

export default ProductService;
