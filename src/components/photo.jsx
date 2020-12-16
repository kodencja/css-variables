import React, { Component } from "react";

class Photo extends Component {
  render() {
    return (
      <div className="sec2 text-center container-fluid m-0 p-0">
        <div className="row m-0 text-center pt-3">
          <img
            src={this.props.sorc}
            alt="somephoto"
            className="img-fluid col-10 col-sm-5"
            style={{
              padding: `${this.props.onSpacing}px`,
              background: this.props.onBgr,
              filter: "blur(" + this.props.onBlur + "px)",
            }}
          />
        </div>
      </div>
    );
  }
}

export default Photo;
