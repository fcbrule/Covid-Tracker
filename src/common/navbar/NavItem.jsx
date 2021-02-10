import React, { useState } from "react";

import "./Navitem.css";

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="cvt19nav-item">
      <div className="cvt19icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </div>
      {open ? props.children : ""}
    </li>
  );
}

export default NavItem;
