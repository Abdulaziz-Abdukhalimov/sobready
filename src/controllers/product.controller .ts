import Errors, { HttpCode, Message } from "../libs/Errors";
import { Request, Response } from "express";
import { T } from "../libs/types/common";
import ProductService from "../models/Product.service";
import { AdminRequest } from "../libs/types/member";
import { ProductInput } from "../libs/types/products";

const productService = new ProductService();
const productController: T = {};

productController.getAllProducts = async (req: Request, res: Response) => {
  try {
    console.log("getAllProducts");

    const data = await productService.getAllProducts();

    res.render("products", { products: data });
  } catch (err) {
    console.log("Error getAllProducts:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

productController.createNewProduct = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("createNewProduct");
    if (!req.files?.length)
      throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED);

    const data: ProductInput = req.body;
    data.productImages = req.files?.map((el) => {
      return el.path.replace(/\\/g, "/");
    });
    await productService.createNewProduct(data);
    res.send(
      `<script> alert("Product successfully created"); window.location.replace('/admin/product/all')</script>`
    );
  } catch (err) {
    console.log("Error createNewProduct:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

productController.updateChosenProduct = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenProduct");
    const id = req.params.id;
    const result = await productService.updateChoosenProduct(id, req.body);
    res.status(HttpCode.OK).send({ product: result });
  } catch (err) {
    console.log("Error getAllProducts:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

productController.deleteChoosenProduct = async (
  req: Request,
  res: Response
) => {
  try {
    console.log("deleteChoosenProduct");
    const id = req.params.id;
    const result = await productService.deleteChoosenProduct(id);
    res.status(HttpCode.DELETED).end();
  } catch (err) {
    console.log("Error deleteChoosenProduct:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default productController;
