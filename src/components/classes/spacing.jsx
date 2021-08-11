import React, { Component } from "react";

class Spacing extends Component {
  render() {
    const { onChanging, onValue } = this.props;

    return (
      <div className="col-10 col-sm-4">
        <label htmlFor="spacing">Spacing</label>
        <input
          className="form-control-range"
          id="spacing"
          type="range"
          name="spacing"
          min="10"
          max="200"
          onChange={onChanging}
          value={onValue.spacing}
          data-sizing="px"
        />
      </div>
    );
  }
}

export default Spacing;
