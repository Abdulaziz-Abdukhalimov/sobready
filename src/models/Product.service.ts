import { Product } from "../libs/types/products";

class ProductService {
  constructor() {}

  /* SSR */
  public async getAllProducts(): Promise<Product[]> {}
}

export default ProductService;
