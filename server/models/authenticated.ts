import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
  }
});

userSchema.pre("save", async function (this: any, next) {
  let user = this;
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hashedpw = await bcrypt.hash(user.password, salt);
    user.password = hashedpw;
  }
  next();
});

const User = model("User", userSchema);
export async function login(email: string, password: string) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("user does not exist");
  } else {
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      return user;
    } else {
      throw new Error("not valid");
    }
  }
}

export default User;