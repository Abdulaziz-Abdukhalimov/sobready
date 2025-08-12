import MemberService from "../models/Member.service";
import { T } from "../libs/types/common";
import { NextFunction, Request, Response } from "express";
import { MemberInput, Member, LoginInput } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";

const memberService = new MemberService();
const memberController: T = {};

//Signup
memberController.signup = async (req: Request, res: Response) => {
  try {
    console.log("signup");

    const input: MemberInput = req.body,
      result: Member = await memberService.signup(input);

    // // SESSIONS AUTHENTICATION
    // req.session.member = result;
    // req.session.save(function () {
    //   res.send("welcome to products page");
    // });
    res.status(HttpCode.CREATED).json({ member: result });
  } catch (err) {
    console.log("Error signup:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

//login
memberController.login = async (req: Request, res: Response) => {
  try {
    console.log("login");
    const input: LoginInput = req.body;
    const result = await memberService.login(input);
    // // SESSIONS AUTHENTICATION
    // req.session.member = result;
    // req.session.save(function () {
    //   res.send("wellcome to product page");
    // });
    res.status(HttpCode.OK).json({ member: result });
  } catch (err) {
    console.log("Error login:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default memberController;
