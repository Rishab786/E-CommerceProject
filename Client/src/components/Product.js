import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "../gqlOperations/queries";
import { useCart } from "react-use-cart";

const Product = () => {
  const { addItem } = useCart();
  const { pid } = useParams();

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: {
      _id: pid,
    },
  });
  if (loading) return <h1>Loading Please wait.....</h1>;
  if (error) console.log(error);

  const { name, price, description, url } = data.product;

  const addToCart = () => {
    addItem({
      id: pid,
      name,
      price,
      url,
    });
    alert("item added to cart");
  };

  return (
    <div className="container">
      <img style={{ height: "50vh" }} src={url} />
      <div>
        <h3>{name}</h3>
        <h5 className="green-text" style={{ fontWeight: "bold" }}>
          ₹ {price}
        </h5>
        <p>{description}</p>
        <button className="btn blue" onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
