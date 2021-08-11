import React, { Component } from "react";

class Blur extends Component {
  render() {
    const { onChanging, onValue } = this.props;

    return (
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
    );
  }
}

export default Blur;
