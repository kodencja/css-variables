import React from "react";

function areEqual(prevProps, nextProps) {
  return prevProps.onValue.bgrCol === nextProps.onValue.bgrCol;
}

function BgrCol(props) {
  const { onChanging, onValue } = props;
  // console.log("BgrCol Comp.");

  return (
    <div className="input-cont col-10 col-xsm-6 col-sm-3 px-sm-2">
      <div className="input-block">
        <label htmlFor="bgrCol">Bgr Color</label>
        <input
          className="form-control-range"
          aria-label="bgr-col"
          id="bgrCol"
          type="color"
          name="bgrCol"
          onChange={onChanging}
          value={onValue.bgrCol}
        />
        <output className="bubble" data-testid="bgr-output">
          Bgr-Color: {onValue.bgrCol}
        </output>
      </div>
    </div>
  );
}

export default React.memo(BgrCol, areEqual);
