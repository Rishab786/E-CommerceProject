import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  query getAllProducts {
    products {
      name
      price
      url
      description
      _id
    }
  }
`;

export const GET_PRODUCT = gql`
  query Product($_id: ID!) {
    product(_id: $_id) {
      _id
      name
      price
      url
    }
  }
`;

export const USER_CONFIRMATION = gql`
  query userConfirmation {
    mssg
  }
`;


