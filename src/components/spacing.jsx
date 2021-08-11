import React, { useRef, useEffect } from "react";

function areEqual(prevProps, nextProps) {
  return (
    prevProps.onValue.spacing === nextProps.onValue.spacing &&
    prevProps.onValue.outputStyle === nextProps.onValue.outputStyle
  );
}

function Spacing(props) {
  const { onChanging, onValue, onGetOutputStyle, onOutputStyle } = props;
  // console.log("Spacing Comp.");
  const spacingRef = useRef();

  useEffect(() => {
    // console.log("useEffect in Spacing Comp");
    onOutputStyle();
  }, []);

  return (
    <div className="input-cont col-10 col-xsm-6 col-sm-3 px-sm-2">
      <div className="input-block">
        <label htmlFor="spacing">Spacing</label>
        <input
          className="form-control-range"
          id="spacing"
          type="range"
          name="spacing"
          min="0"
          max="150"
          onChange={onChanging}
          value={onValue.spacing}
          data-sizing="px"
          ref={spacingRef}
        />
        <output
          className="bubble"
          style={onGetOutputStyle(onValue.spacing, spacingRef.current, "%")}
        >
          {onValue.spacing + "px"}
        </output>
      </div>
    </div>
  );
}

export default React.memo(Spacing, areEqual);
