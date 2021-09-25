import React, { useRef, useEffect, useState } from "react";

function areEqual(prevProps, nextProps) {
  return (
    prevProps.onValue.blur === nextProps.onValue.blur &&
    prevProps.onValue.outputStyle === nextProps.onValue.outputStyle
  );
}

function Blur(props) {
  const blurRef = useRef();
  // const { onChanging, blur, onGetOutputStyle, onOutputStyle } = props;
  const { onChanging, onValue, onGetOutputStyle, onOutputStyle } = props;
  // const [blurVal, setBlurVal] = useState("0");
  // console.log("Blur Comp");

  useEffect(() => {
    // console.log("useEffect in Blur Comp");
    onOutputStyle();
  }, []);

  // useEffect(() => {
  //   console.log(onGetOutputStyle(onValue.blur, blurRef.current, "%"));
  //   // setBlurVal(onValue.blur);
  // }, [onOutputStyle, onGetOutputStyle]);

  return React.useMemo(
    () => (
      <div className="input-cont col-10 col-xsm-6 col-sm-3 px-sm-2">
        <div className="input-block">
          <label htmlFor="blur">Blur</label>
          <input
            className="form-control-range"
            aria-label="blur"
            id="blur"
            type="range"
            name="blur"
            min="0"
            max="30"
            onChange={onChanging}
            value={onValue.blur}
            data-sizing="px"
            ref={blurRef}
          />
          <output
            name="blur-output"
            className="bubble"
            style={onGetOutputStyle(onValue.blur, blurRef.current, "%")}
            data-testid="blur-output"
          >
            {onValue.blur}px
          </output>
        </div>
      </div>
    ),
    [onChanging, onValue.blur, onValue.outputStyle]
  );
}

export default React.memo(Blur, areEqual);
