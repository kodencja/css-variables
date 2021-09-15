import React, { useRef, useEffect } from "react";

function areEqual(prevProps, nextProps) {
  return (
    prevProps.onValue.rotatex === nextProps.onValue.rotatex &&
    prevProps.onValue.rotatey === nextProps.onValue.rotatey &&
    prevProps.onValue.rotatez === nextProps.onValue.rotatez &&
    prevProps.onValue.transOrigX === nextProps.onValue.transOrigX &&
    prevProps.onValue.transOrigY === nextProps.onValue.transOrigY &&
    prevProps.onValue.transOrigZ === nextProps.onValue.transOrigZ &&
    prevProps.onValue.outputStyle === nextProps.onValue.outputStyle &&
    prevProps.onValue.skew === nextProps.onValue.skew
  );
}

function Transform(props) {
  const transOrigXRef = useRef();
  const transOrigYRef = useRef();
  const transOrigZRef = useRef();
  const rotateXRef = useRef();
  const rotateYRef = useRef();
  const rotateZRef = useRef();
  const skewRef = useRef();

  const { onChanging, onValue, onOutputStyle, onGetOutputStyle } = props;
  // console.log("Transform Comp.");

  useEffect(() => {
    onOutputStyle();
  }, []);

  return (
    <>
      <>
        <div className="input-cont col-10 col-xsm-6 col-sm-3 px-sm-2">
          <div className="input-block">
            <label htmlFor="transOrigX">TransOrig-X</label>
            <input
              className="form-control-range"
              id="transOrigX"
              type="range"
              name="transOrigX"
              min="-100"
              max="100"
              data-sizing="px"
              onChange={onChanging}
              value={onValue.transOrigX}
              ref={transOrigXRef}
            />
            <output
              className="bubble"
              style={
                // left: ((parseInt(onValue.transOrigX) + 100) * 100) / 200 + "%",
                onGetOutputStyle(onValue.transOrigX, transOrigXRef.current, "%")
              }
            >
              {onValue.transOrigX + "%"}
            </output>
          </div>
        </div>

        <div className="input-cont col-10 col-xsm-6 col-sm-3 px-sm-2">
          <div className="input-block">
            <label htmlFor="transOrigY">TransOrig-Y</label>
            <input
              className="form-control-range"
              id="transOrigY"
              type="range"
              name="transOrigY"
              min="-100"
              max="100"
              data-sizing="px"
              onChange={onChanging}
              value={onValue.transOrigY}
              ref={transOrigYRef}
            />
            <output
              className="bubble"
              style={onGetOutputStyle(
                onValue.transOrigY,
                transOrigYRef.current,
                "%"
              )}
            >
              {onValue.transOrigY + "%"}
            </output>
          </div>
        </div>

        <div className="input-cont col-10 col-xsm-6 col-sm-3 px-sm-2">
          <div className="input-block">
            <label htmlFor="transOrigZ">TransOrig-Z</label>
            <input
              className="form-control-range"
              id="transOrigZ"
              type="range"
              name="transOrigZ"
              min="-100"
              max="100"
              data-sizing="px"
              onChange={onChanging}
              value={onValue.transOrigZ}
              ref={transOrigZRef}
            />
            <output
              className="bubble"
              style={onGetOutputStyle(
                onValue.transOrigZ,
                transOrigZRef.current,
                "%"
              )}
            >
              {onValue.transOrigZ + "px"}
            </output>
          </div>
        </div>
      </>

      <>
        <div className="input-cont col-10 col-xsm-6 col-sm-3 px-sm-2">
          <div className="input-block">
            <label htmlFor="rotatex">Rotate X</label>
            <input
              className="form-control-range"
              id="rotatex"
              type="range"
              name="rotatex"
              min="-180"
              max="180"
              data-sizing="px"
              onChange={onChanging}
              value={onValue.rotatex}
              ref={rotateXRef}
            />
            <output
              className="bubble"
              style={onGetOutputStyle(onValue.rotatex, rotateXRef.current, "%")}
            >
              {onValue.rotatex + "deg"}
            </output>
          </div>
        </div>

        <div className="input-cont col-10 col-xsm-6 col-sm-3 px-sm-2">
          <div className="input-block">
            <label htmlFor="rotatey">Rotate Y</label>
            <input
              className="form-control-range"
              id="rotatey"
              type="range"
              name="rotatey"
              min="-180"
              max="180"
              data-sizing="px"
              onChange={onChanging}
              value={onValue.rotatey}
              ref={rotateYRef}
            />
            <output
              className="bubble"
              style={onGetOutputStyle(onValue.rotatey, rotateYRef.current, "%")}
            >
              {onValue.rotatey + "deg"}
            </output>
          </div>
        </div>

        <div className="input-cont col-10 col-xsm-6 col-sm-3 px-sm-2">
          <div className="input-block">
            <label htmlFor="rotatez">Rotate Z</label>
            <input
              className="form-control-range"
              id="rotatez"
              type="range"
              name="rotatez"
              min="-180"
              max="180"
              data-sizing="px"
              onChange={onChanging}
              value={onValue.rotatez}
              ref={rotateZRef}
            />
            <output
              className="bubble"
              style={onGetOutputStyle(onValue.rotatez, rotateZRef.current, "%")}
            >
              {onValue.rotatez + "deg"}
            </output>
          </div>
        </div>

        <div className="input-cont col-10 col-xsm-6 col-sm-3 px-sm-2">
          <div className="input-block">
            <label htmlFor="skew">Skew</label>
            <input
              className="form-control-range"
              id="skew"
              type="range"
              name="skew"
              min="-90"
              max="90"
              data-sizing="px"
              onChange={onChanging}
              value={onValue.skew}
              ref={skewRef}
            />
            <output
              className="bubble"
              style={
                onGetOutputStyle(onValue.skew, skewRef.current, "%")
                //  left: ((parseInt(onValue.skew) + 90) * 100) / 180 + "%"
              }
            >
              {onValue.skew + "deg"}
            </output>
          </div>
        </div>
      </>
    </>
  );
}

export default React.memo(Transform, areEqual);
