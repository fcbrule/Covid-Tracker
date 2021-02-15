import React from "react";

import "./Card.css";

const Card = (props) => {
  return (
    <div
      className="cvt19card"
      style={{ backgroundColor: props.backgroundColor }}
    >
      {props.children}
    </div>
  );
};

export default Card;
