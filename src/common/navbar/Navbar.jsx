import React from "react";

import "./Navbar.css";

const Navbar = (props) => {
  return (
    <nav className="cvt19navbar">
      <ul className="cvt19navbar-notification "> {props.children}</ul>
    </nav>
  );
};

export default Navbar;
