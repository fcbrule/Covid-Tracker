import React from "react";

import "./Navbar.css";

const Navbar = (props) => {
  return (
    <div className="cvt19navbar">
      <div className="cvt19navbar-notification "> {props.children}</div>
    </div>
  );
};

export default Navbar;
