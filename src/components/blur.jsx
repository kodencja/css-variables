import React from "react";

function areEqual(prevProps, nextProps) {
  return prevProps.onValue.blur === nextProps.onValue.blur;
}

function Blur(props) {
  const { onChanging, onValue } = props;
  console.log("Blur Fn");

  return React.useMemo(
    () => (
      <div className="col-10 col-sm-4">
        <label htmlFor="blur">Blur</label>
        <input
          className="form-control-range"
          id="blur"
          type="range"
          name="blur"
          min="0"
          max="30"
          onChange={onChanging}
          value={onValue.blur}
          data-sizing="px"
        />
      </div>
    ),
    [onChanging, onValue.blur]
  );
}

export default React.memo(Blur, areEqual);
// export default React.memo(Blur);
