import { gql } from "apollo-server";
const typeDefs = gql`
  type Query {
    user(_id: ID!): User
    products: [Product]
    product(_id: ID!): Product
    userConfirmation: obj
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
  type obj {
    mssg: String!
  }

  type Token {
    token: String!
  }

  type Mutation {
    signupUser(userNew: UserInput!): Token
    signinUser(userSignin: UserSigninInput!): Token
  }
  type Product {
    name: String!
    price: ID!
    url: String!
    description: String!
    _id: ID
  }
  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
  input UserSigninInput {
    email: String!
    password: String!
  }
`;
export default typeDefs;
