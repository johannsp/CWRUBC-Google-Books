import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function SaveBtn(props) {
  return (
    <span className="save-btn btn btn-primary" {...props} role="button" tabIndex="1">
      {props.disabled ? "Saved" : "Save"}
    </span>
  );
}

export default SaveBtn;
