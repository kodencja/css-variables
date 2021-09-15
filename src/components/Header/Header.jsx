import React from "react";
import SubHeader from "../subHeader/SubHeader";

// jesli damy tylko jeden <h2>{text}</h2> to test no 3 przejdzie
function Header({ text, children }) {
  return (
    <div
      title="main"
      data-testid={"header-1"}
      className="font-weight-bold p-3 main-title"
    >
      <h2>{text}</h2>
      <h2>Rotating</h2>

      {/* <h4>
        <SubHeader classN="titleBlur" text="Update CSS Vars" />
        <SubHeader classN="titleCol" text="with JS" />
      </h4> */}
      {children}
    </div>
  );
}

export default Header;
