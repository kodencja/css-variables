import React, { useContext, useState, useEffect, lazy, Suspense } from "react";
import { ControlModalContext } from "../App";
const Blur = lazy(() => import("./Blur"));
const Color = lazy(() => import("./Color"));
const BgrCol = lazy(() => import("./BgrCol"));
const Spacing = lazy(() => import("./Spacing"));
const Transform = lazy(() => import("./Transform"));
const ChooseAnim = lazy(() => import("./ChooseAnim"));

function Controls() {
  // console.log("Controls Comp.");
  const [hideForm, setHideForm] = useState(false);
  const controlModalContextValue = useContext(ControlModalContext);
  const { onChanging, onValue, onOutputStyle } = controlModalContextValue;

  const getOutputStyle = (inputVal, refObj, unit) => {
    if (refObj !== undefined && refObj !== null) {
      let refObjMin = parseInt(refObj.getAttribute("min"));
      let refObjMax = parseInt(refObj.getAttribute("max"));
      if (refObjMin < 0) refObjMin = refObjMin * -1;
      return {
        left:
          ((parseInt(inputVal) + refObjMin) * 100) / (refObjMin + refObjMax) +
          unit,
      };
    }
  };

  const toggleMenu = (e) => {
    e.preventDefault();
    console.log("toggle icon clicked!");
    setHideForm(!hideForm);
  };

  const formStyle = hideForm
    ? "form-group controls px-2 row move-up-mrg"
    : "form-group controls px-2 row";

  return (
    <div role="navigation" className="container-fluid sec1 m-0">
      <form className="py-1 mx-auto">
        <div className={formStyle}>
          <Suspense fallback={<p>Loading...</p>}>
            <Color onChanging={onChanging} onValue={onValue} />
            <BgrCol onChanging={onChanging} onValue={onValue} />
            <Spacing
              onChanging={onChanging}
              onValue={onValue}
              onOutputStyle={onOutputStyle}
              onGetOutputStyle={getOutputStyle}
            />
            <Blur
              onChanging={onChanging}
              onValue={onValue}
              onOutputStyle={onOutputStyle}
              onGetOutputStyle={getOutputStyle}
            />
            <Transform
              onChanging={onChanging}
              onValue={onValue}
              onOutputStyle={onOutputStyle}
              onGetOutputStyle={getOutputStyle}
            />
          </Suspense>
        </div>
      </form>
      <form className="anim-choice my-2">
        <Suspense fallback={<p>Loading...</p>}>
          <ChooseAnim onChanging={onChanging} />
          <button className="toggle-icon btn" onClick={toggleMenu}>
            {hideForm ? "Show" : "Hide"}
          </button>
        </Suspense>
      </form>
    </div>
  );
}

export default React.memo(Controls);
