const router = require("express").Router();
const { User, validate } = require("../modules/users");
import bcrypt from 'bcrypt';
import Joi from 'joi';
import { Request, Response } from 'express';

// register user

router.post("/", async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const user = await User.findOne({ email: req.body.email });
  if (user)
    return res
      .status(401)
      .send({ message: "User with given email already exist!" });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  await new User({ ...req.body, password: hashPassword }).save();
  res.status(201).send({ message: "User created successfully" });
});

module.exports = router;
