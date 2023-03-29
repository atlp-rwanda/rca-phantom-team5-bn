import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';

// user schema

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// Generate a token

userSchema.methods.generateAuthToken = () => {
  const token = jwt.sign({ _id: this.id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });

  return token;
};

const User = mongoose.model("users", userSchema);

const validate = (data: string) => {
  const schema = Joi.object({
    firstname: Joi.string().required().label("Firstname"),
    lastname: Joi.string().required().label("Lastname"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });

  return schema.validate(data);
};

module.exports = { User, validate };
