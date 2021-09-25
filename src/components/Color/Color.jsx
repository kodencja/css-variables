import React from "react";

function areEqual(prevProps, nextProps) {
  return prevProps.onValue.color === nextProps.onValue.color;
}

function Color(props) {
  const { onChanging, onValue } = props;
  // console.log("Color Comp.");

  return (
    <div className="input-cont col-10 col-xsm-6 col-sm-3 px-sm-2">
      <div className="input-block">
        <label htmlFor="color">Base Color</label>
        <input
          className="form-control-range"
          aria-label="base-color"
          id="color"
          type="color"
          name="color"
          onChange={onChanging}
          value={onValue.color}
        />
        <output className="bubble" data-testid="base-color">
          {onValue.color}
        </output>
      </div>
    </div>
  );
}

export default React.memo(Color, areEqual);
