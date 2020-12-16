import React, { Component } from "react";

class Color extends Component {
  render() {
    return (
      <div className="col-10 col-sm-4">
        <label htmlFor="color">Base Color</label>
        <input
          className="form-control-range"
          id="color"
          type="color"
          name="color"
          onChange={this.props.onChanging}
          value={this.props.onValue.color}
        />
      </div>
    );
  }
}

export default Color;
