import React from "react";
import { useCart } from "react-use-cart";
import { URL } from "../config";

const query = `
  query {
    userConfirmation {
      mssg
    }
  }
`;

const Cart = () => {
  const jwt = localStorage.getItem("token");

  const { isEmpty, items, cartTotal, removeItem, emptyCart } = useCart();

  const checkout = async () => {
    if (!jwt) {
      return alert("please login to place orders");
    }

    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: jwt,
        total: cartTotal,
      },
      body: JSON.stringify({ query }),
    });

    alert("your order is placed,thank you for choosing eKart");

    emptyCart();
  };

  if (isEmpty) return <h1>Your cart is empty</h1>;

  return (
    <div>
      <div className="container row">
        <ul className="collection col m8">
          {items.map((item) => {
            return (
              <li key={item.id} className="collection-item avatar">
                <img src={item.url} className="circle" />
                <span className="title truncate">{item.name}</span>
                <p className="green-text">
                  Price - ₹ {item.price} x {item.quantity} = ₹{item.itemTotal}
                </p>
                <i
                  onClick={() => removeItem(item.id)}
                  className="secondary-content material-icons red-text"
                >
                  remove_circle
                </i>
              </li>
            );
          })}
        </ul>
        <div
          className="col m3 offset-m1"
          style={{ position: "sticky", top: "2px" }}
        >
          <h3>Total Price</h3>
          <h3>₹ {cartTotal}</h3>

          <button className="btn blue" onClick={checkout}>
            checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
