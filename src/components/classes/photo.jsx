import React, { Component } from "react";

class Photo extends Component {
  render() {
    const { sorc, onSpacing, onBgr, onBlur } = this.props;

    return (
      <div className="sec2 text-center container-fluid m-0 p-0">
        <div className="row m-0 text-center pt-3">
          <img
            src={sorc}
            alt="somephoto"
            className="img-fluid col-10 col-sm-5"
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
}

export default Photo;
