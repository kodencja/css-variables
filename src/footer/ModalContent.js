import React, { useContext } from "react";
import { ControlModalContext } from "../App";
import("./css/modalContent.css");

function ModalContent() {
  const modalContextValue = useContext(ControlModalContext);
  const { handleModalOpen } = modalContextValue;
  // console.log("ModalContent Fn");

  return (
    <>
      <div className="btn-close2">
        <button
          className="btn close-btn border-dark btn-sm"
          onClick={() => handleModalOpen(false)}
        >
          X
        </button>
      </div>

      <p className="title-code">Webdeveloping information</p>
      <div className="dialog-question dev-box">
        <div>
          <p>
            &nbsp;&nbsp;&nbsp;This page was built in <b>REACT.JS</b> with class
            and functional components supported by <b>HOOK tools</b> such as{" "}
            <b>useContext, useState, useRef</b> or <b>useEffect</b>. Other React libraries embrace:{" "}
            <b>createContext, memo</b> as well as <b>react-modal</b>. All
            components have been optimized using functions such as{" "}
            <b>React.memo()</b> along with '<b>areEqual</b>' function (as a
            second parameter of React.memo()) that compares previous and next
            values of a component's 'props', as well as <b>lazy</b> and{" "}
            <b>Suspense</b> React's libraries. <br />
          </p>
          <a
            href="https://github.com/kodencja/css-variables"
            target="_blank"
            rel="noreferrer"
          >
            See the code
          </a>
        </div>
      </div>
    </>
  );
}

export default React.memo(ModalContent);
