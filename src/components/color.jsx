import React from "react";

function areEqual(prevProps, nextProps) {
  return prevProps.onValue.color === nextProps.onValue.color;
}

function Color(props) {
  const { onChanging, onValue } = props;
  console.log("Color Fn");

  return (
    <div className="col-10 col-sm-4">
      <label htmlFor="color">Base Color</label>
      <input
        className="form-control-range"
        id="color"
        type="color"
        name="color"
        onChange={onChanging}
        value={onValue.color}
      />
    </div>
  );
}

export default React.memo(Color, areEqual);
