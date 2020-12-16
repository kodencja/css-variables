import React, { Component } from "react";

class Spacing extends Component {
  render() {
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
          onChange={this.props.onChanging}
          value={this.props.onValue.spacing}
          data-sizing="px"
        />
      </div>
    );
  }
}

export default Spacing;
