import { Router, Response } from "express";
import { ILogin, IRegister } from "../Interface/types";
import * as yup from "yup";
import userModel, { login } from '../models/authenticated'
import jwt from "jsonwebtoken";

export const AuthRouter = Router();

const TOKEN = process.env.JWT_KEY || "";

let authSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),

});

AuthRouter.post("/register", async (req, res: Response) => {
  const registerhPayload: IRegister = req.body;
  try {
    const validPayload = await authSchema.validate(registerhPayload);

    const newUserObj = new userModel(validPayload);
    const newUser = await newUserObj.save();
    const token = jwt.sign(
      { _id: newUser._id, email: newUser.email },
      "SHH_its_SECRET"
    );
    res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      fullname: newUser.firstname,
      address: newUser.lastname,
      gender : newUser.gender,
      phonenumber : newUser.phonenumber,
      token
    });
  } catch (err) {
    res.status(422).json({ errors: 'Registration Error' });
  }
});

AuthRouter.post("/login", async (req, res) => {
  const loginPayload: ILogin = req.body;

  try {
    const validPayload = await authSchema.validate(loginPayload);

    try {
      const user = await login(validPayload.email, validPayload.password);
      const token = jwt.sign(
        { _id: user._id, email: user.email },
        "SHH_its_SECRET"
      );
      res.json({ token });
    } catch (error) {
      res.status(422).json({ errors: 'Login Failed ' });
    }
  } catch (err) {
    res.status(500).json({ errors: 'Server Error' });
  }
});



