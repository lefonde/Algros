import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/" exact>
            home
          </NavLink>
        </li>
      )}
      <li>
        <NavLink to="/intro">intro</NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/courses">courses</NavLink>
        </li>
      )}
      <li>
        <NavLink to="/about">about</NavLink>
      </li>
     
    </ul>
  );
};

export default NavLinks;
