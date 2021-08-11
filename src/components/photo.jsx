import React, { useEffect, useState } from "react";
import axios from "axios";

function areEqual(prevProps, nextProps) {
  return (
    prevProps.onState.spacing === nextProps.onState.spacing &&
    prevProps.onState.color === nextProps.onState.color &&
    prevProps.onState.bgrCol === nextProps.onState.bgrCol &&
    prevProps.onState.blur === nextProps.onState.blur &&
    prevProps.onState.rotatex === nextProps.onState.rotatex &&
    prevProps.onState.rotatey === nextProps.onState.rotatey &&
    prevProps.onState.rotatez === nextProps.onState.rotatez &&
    prevProps.onState.transOrigX === nextProps.onState.transOrigX &&
    prevProps.onState.transOrigY === nextProps.onState.transOrigY &&
    prevProps.onState.transOrigZ === nextProps.onState.transOrigZ &&
    prevProps.onState.skew === nextProps.onState.skew &&
    prevProps.onState.animation === nextProps.onState.animation
  );
}

function Photo(props) {
  const [source, setSource] = useState();

  const {
    blur,
    spacing,
    color,
    bgrCol,
    skew,
    rotatex,
    rotatey,
    rotatez,
    transOrigX,
    transOrigY,
    transOrigZ,
    animation,
  } = props.onState;
  // console.log("Photo Comp.");

  useEffect(() => {
    axios
      .get(
        "https://images.unsplash.com/photo-1526816222984-8362d302d9c3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80",
        {
          responseType: "arraybuffer",
          ContentType: "image/jpg",
        }
      )
      .then((res) => {
        setSource(res.config.url);
      });
  }, []);

  return (
    <div
      className="sec2 text-center container-fluid mt-2"
      style={{
        backgroundColor: bgrCol,
      }}
    >
      <div className="row mb-0 text-center cont-img" style={{}}>
        <img
          src={source}
          alt="somephoto"
          className="img-fluid col-10 col-sm-4 image"
          width="auto"
          height="auto"
          style={{
            padding: `${spacing}px`,
            background: color,
            filter: "blur(" + blur + "px)",
            animationName: animation,
            transformOrigin: `${transOrigX}% ${transOrigY}% ${transOrigZ}px`,
            WebkitTransformOrigin: `${transOrigX}% ${transOrigY}% ${transOrigZ}px`,
            transform: `rotateX(${rotatex}deg) rotateY(${rotatey}deg) rotateZ(${rotatez}deg) skew(${skew}deg)`,
          }}
        />
      </div>
    </div>
  );
}

export default React.memo(Photo, areEqual);
