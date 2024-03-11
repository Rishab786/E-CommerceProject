import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import { CartProvider } from "react-use-cart";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { URL } from "./config.js";
import Home from "./components/Home";
import Product from "./components/Product";

const client = new ApolloClient({
  uri: URL,
  cache: new InMemoryCache(),
});
const App = () => {
  return (
    <React.StrictMode>
      <CartProvider>
        <ApolloProvider client={client}>
          <NavBar />
          <Outlet />
        </ApolloProvider>
      </CartProvider>
    </React.StrictMode>
  );
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/product/:pid",
        element: <Product />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
