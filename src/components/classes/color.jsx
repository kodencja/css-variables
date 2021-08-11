import React, { Component } from "react";

class Color extends Component {
  render() {
    const { onChanging, onValue } = this.props;

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
}

export default Color;
