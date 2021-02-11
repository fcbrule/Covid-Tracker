import React, { useState } from "react";

import "./Navitem.css";

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="cvt19nav-item">
      <div className="cvt19icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </div>
      {open ? props.children : ""}
    </div>
  );
}

export default NavItem;
