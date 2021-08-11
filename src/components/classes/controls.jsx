import React, { Component } from "react";
import Blur from "./blur";
import Color from "./color";
import Spacing from "./spacing";

class Controls extends Component {
  render() {
    const { onChanging, onVal } = this.props;
    return (
      <div className="container-fluid sec1 m-0">
        <form className="form-group row py-4 mx-1">
          <Spacing onChanging={onChanging} onValue={onVal} />
          <Blur onChanging={onChanging} onValue={onVal} />
          <Color onChanging={onChanging} onValue={onVal} />
        </form>
      </div>
    );
  }
}

export default Controls;
