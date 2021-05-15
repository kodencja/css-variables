import React, { useEffect, useState } from "react";
import axios from "axios";

function areEqual(prevProps, nextProps) {
  return (
    prevProps.onSpacing === nextProps.onSpacing &&
    prevProps.onBgr === nextProps.onBgr &&
    prevProps.onBlur === nextProps.onBlur
  );
}

function Photo(props) {
  const [source, setSource] = useState();
  const { onSpacing, onBgr, onBlur } = props;
  console.log("Photo Fn");

  useEffect(() => {
    axios
      .get(
        "https://images.unsplash.com/photo-1601758282760-b6cc3d07523d?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
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
    <div className="sec2 text-center container-fluid py-3 px-1">
      <div className="row m-0 text-center ">
        <img
          src={source}
          alt="somephoto"
          className="img-fluid col-10 col-sm-5"
          width="auto"
          height="auto"
          style={{
            padding: `${onSpacing}px`,
            background: onBgr,
            filter: "blur(" + onBlur + "px)",
          }}
        />
      </div>
    </div>
  );
}

export default React.memo(Photo, areEqual);
// export default React.memo(Photo);
