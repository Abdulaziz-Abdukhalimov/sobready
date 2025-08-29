import express, { Request, Response } from "express";
const routerAdmin = express.Router();
import restaurantController from "./controllers/restaurant.controller ";
import makeUploader from "./libs/utils/uploader";
import productController from "./controllers/product.controller ";
import memberController from "./controllers/member.controller ";

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
  restaurantController.verifyAdmin,
  makeUploader("products").array("productImages", 5),
  productController.createNewProduct
);
routerAdmin.post(
  "/product/:id",
  restaurantController.verifyAdmin,
  productController.updateChosenProduct
);
routerAdmin.post(
  "/product/delete/:id",
  restaurantController.verifyAdmin,
  productController.deleteChoosenProduct
);
export default routerAdmin;

/* USERS */
routerAdmin.get(
  "/user/all",
  restaurantController.verifyAdmin,
  restaurantController.getUsers
);
routerAdmin.post(
  "/user/edit/:id",
  restaurantController.verifyAdmin,
  restaurantController.updateChoosenUser
);
