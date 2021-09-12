import React, { useContext } from "react";
import { HashLink as NavLink } from 'react-router-hash-link';

import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/#homeAnchorTag" exact>
            Home
          </NavLink>
        </li>
      )}
      <li>
        <NavLink to="/#introAnchorTag">Intro</NavLink>
      </li>
      <li>
        <NavLink to="/#aboutAnchorTag">About</NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/courses">Courses</NavLink>
        </li>
      )}
     
    </ul>
  );
};

export default NavLinks;
