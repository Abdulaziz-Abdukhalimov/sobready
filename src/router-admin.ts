import express, { Request, Response } from "express";
import restaurantController from "./controllers/restaurant.controller ";
import makeUploader from "./libs/utils/uploader";
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

export default routerAdmin;
