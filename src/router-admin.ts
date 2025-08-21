import express, { Request, Response } from "express";
import restaurantController from "./controllers/restaurant.controller ";
import makeUploader from "./libs/utils/uploader";
import { ProductCollection } from "./libs/enums/product.enum";
import productController from "./controllers/product.controller ";
import memberController from "./controllers/member.controller ";
const routerAdmin = express.Router();

/* Restaurant */
routerAdmin.get("/", restaurantController.homePage);

routerAdmin
  .get("/login", restaurantController.getLogin)
  .post("/login", restaurantController.processLogin);

routerAdmin
  .get("/signup", restaurantController.getSignup)
  .post(
    "/signup",
    makeUploader("members").single("memberImage"),
    restaurantController.processSignup
  );

routerAdmin.get("/check-me", restaurantController.checkAuthSession);
routerAdmin.get("/logout", restaurantController.logout);

/* PRODUCT */
routerAdmin.get(
  "/product/all",
  restaurantController.verifyAdmin,
  productController.getAllProducts
);
routerAdmin.post(
  "/product/create",
  memberController.verifyAdmin,
  productController.createNewProduct
);
routerAdmin.post(
  "/product/:id",
  memberController.verifyAdmin,
  productController.updateChosenProduct
);
export default routerAdmin;
