import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from "./schemaGql.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { MONGO_URI, JWT_SECRET } from "./config.js";
import "./models/Product.js";
import "./models/Users.js";
import "./models/Order.js";
import resolvers from "./resolvers.js";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongodb");
});

mongoose.connection.on("error", (err) => {
  console.log("error connecting", err);
});

const context = ({ req }) => {
  const { authorization, total } = req.headers;
  if (authorization) {
    const { userId } = jwt.verify(authorization, JWT_SECRET);
    return { userId, total };
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
