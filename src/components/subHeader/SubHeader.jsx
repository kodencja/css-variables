import React from "react";
// import React, { useContext } from "react";
// import { ControlModalContext } from "../../App";

function SubHeader({ classN, text }) {
  //   const controlModalContextValue = useContext(ControlModalContext);
  //   const {
  //     onValue: { blur },
  //   } = controlModalContextValue;

  return <span className={classN}>{text}</span>;

  //   classN === "titleBlur" ? (
  //     <span className={classN} style={{ filter: "blur(" + blur + "px)" }}>
  //       {text}
  //     </span>
  //   ) : (
  //     <span className={classN}>{text}</span>
  //   );
}

export default SubHeader;
