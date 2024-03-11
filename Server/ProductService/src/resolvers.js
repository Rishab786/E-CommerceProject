import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { JWT_SECRET } from "./config.js";
import { publishMessage, channel } from "../utility/messageQueue.js";

const User = mongoose.model("User");
const Product = mongoose.model("Product");
const Order = mongoose.model("Order");

const resolvers = {
  Query: {
    user: async (_, { _id }) => await User.findOne({ _id }),

    products: async () => await Product.find({}),

    product: async (_, { _id }) => await Product.findOne({ _id }),

    userConfirmation: async (_, __, { userId, total }) => {
      const user = await User.findById(userId);
      const order = new Order({
        userId: user.email,
        totalAmount: total,
      });
      await order.save();
      const message = {
        id: user.email,
        message: "Order Placed Successfully",
      };

      await publishMessage(channel, JSON.stringify(message));
      return {
        mssg: "success",
      };
    },
  },

  Mutation: {
    signupUser: async (_, { userNew }) => {
      let user = await User.findOne({ email: userNew.email });
      if (user) {
        throw new Error("User already exists");
      }
      const hashedPassword = await bcrypt.hash(userNew.password, 10);

      const newUser = new User({
        ...userNew,
        password: hashedPassword,
      });
      await newUser.save();
      user = await User.findOne({ email: userNew.email });
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);

      return { token };
    },

    signinUser: async (_, { userSignin }) => {
      const user = await User.findOne({ email: userSignin.email });
      if (!user) {
        throw new Error("User dosent exists");
      }
      const decodeUser = await bcrypt.compare(
        userSignin.password,
        user.password
      );
      if (!decodeUser) {
        throw new Error("email or password is invalid");
      }
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      return { token };
    },
  },
};

export default resolvers;
