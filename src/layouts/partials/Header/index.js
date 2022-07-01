import React from "react";
import "./styles.scss";
import { NavLink } from "react-router-dom";

function Header(props) {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/products">Products</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Header;
