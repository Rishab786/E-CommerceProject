import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const jwt = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav>
      <div className="nav-wrapper #1976d2 purple">
        <Link to="/" className="brand-logo left">
          eKart 🛒
        </Link>
        <ul id="nav-mobile" className="right">
          <li>
            <Link to="/cart">
              <i
                style={{ padding: "0 20px" }}
                className="material-icons large #0d47a1 blue darken-4"
              >
                add_shopping_cart
              </i>
            </Link>
          </li>
          {jwt ? (
            <li>
              <i
                style={{ padding: "0 20px" }}
                className="material-icons large red"
                onClick={logout}
              >
                logout
              </i>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">login</Link>
              </li>
              <li>
                <Link to="/signup">signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
