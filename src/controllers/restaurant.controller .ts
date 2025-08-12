import { T } from "../libs/types/common";
import { NextFunction, Request, Response } from "express";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";

const restaurantController: T = {};

restaurantController.homePage = (req: Request, res: Response) => {
  try {
    console.log("homePage");
    res.send("homePage");
  } catch (err) {
    console.log("Error on homePage", err);
  }
};

restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.send("getLogin");
  } catch (err) {
    console.log("Error on getLogin", err);
  }
};

restaurantController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
    res.send("getSignup");
  } catch (err) {
    console.log("Error on getSignup", err);
  }
};
export default restaurantController;
