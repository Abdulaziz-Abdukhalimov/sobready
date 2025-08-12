import express, { Request, Response } from "express";
import restaurantController from "./controllers/restaurant.controller ";
const routerAdmin = express.Router();

/* Restaurant */
routerAdmin.get("/", restaurantController.homePage);

routerAdmin.get("/login", restaurantController.getLogin);
// .post("/login", restaurantController.processLogin);

routerAdmin.get("/signup", restaurantController.getSignup);
export default routerAdmin;
