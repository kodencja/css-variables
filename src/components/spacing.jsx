import React from "react";

function areEqual(prevProps, nextProps) {
  return prevProps.onValue.spacing === nextProps.onValue.spacing;
}

function Spacing(props) {
  const { onChanging, onValue } = props;
  console.log("Spacing Fn");
  return (
    <div className="col-10 col-sm-4">
      <label htmlFor="spacing">Spacing</label>
      <input
        className="form-control-range"
        id="spacing"
        type="range"
        name="spacing"
        min="10"
        max="200"
        onChange={onChanging}
        value={onValue.spacing}
        data-sizing="px"
      />
    </div>
  );
}

export default React.memo(Spacing, areEqual);
