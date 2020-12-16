import React, { Component } from "react";
import Blur from "./blur";
import Color from "./color";
import Spacing from "./spacing";

class Controls extends Component {
  render() {
    return (
      <div className="container-fluid sec1 m-0">
        <form className="form-group row py-4 mx-1">
          <Spacing
            onChanging={this.props.onChanging}
            onValue={this.props.onVal}
          />
          <Blur onChanging={this.props.onChanging} onValue={this.props.onVal} />
          <Color
            onChanging={this.props.onChanging}
            onValue={this.props.onVal}
          />
        </form>
      </div>
    );
  }
}

export default Controls;
