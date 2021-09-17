import React, { Component, lazy, Suspense } from "react";
import Controls from "./components/Controls/Controls";
import Footer from "./footer/Footer";
import "bootstrap/dist/css/bootstrap.css";
import "./css/style.css";
import Header from "./components/Header/Header";
import SubHeader from "./components/subHeader/SubHeader";

const Photo = lazy(() => import("./components/Photo/Photo"));
const ModalComp = lazy(() => import("./footer/ModalComp"));

export const ControlModalContext = React.createContext();

class App extends Component {
  state = {
    blur: "0",
    color: "#f7f9d0",
    bgrCol: "#527198",
    skew: 10,
    skewChanged: false,
    rotatex: 0,
    rotatey: 10,
    rotatez: 15,
    spacing: 10,
    transOrigX: 50,
    transOrigY: 50,
    transOrigZ: 0,
    currentAnimation: "animRotateXYZ",
    modalIsOpen: false,
    outputStyle: false,
    options: [
      "none",
      'rotate',
      "rotate-X",
      "rotate-Y",
      "rotate-Z",
      "rotate-X-Y",
      "rotate-Y-X",
      "rotate-X-Z",
      "rotate-Z-X",
      "rotate-Y-Z",
      "rotate-Z-Y",
      "rotate-X-Y-Z",
      "rotate-X-Z-Y",
      "rotate-Y-X-Z",
      "rotate-Y-Z-X",
      "rotate-Z-X-Y",
      "rotate-Z-Y-X",
    ],
    optionsValues: [
      "none",
      "animRotate",
      "animRotateX",
      "animRotateY",
      "animRotateZ",
      "animRotateXY",
      "animRotateXY",
      "animRotateXZ",
      "animRotateZX",
      "animRotateYZ",
      "animRotateZY",
      "animRotateXYZ",
      "animRotateXZY",
      "animRotateYXZ",
      "animRotateYZX",
      "animRotateZXY",
      "animRotateZYX",
    ],
  };

  appRef = React.createRef();

  componentDidUpdate() {
    const skewVal = getComputedStyle(this.appRef.current).getPropertyValue(
      "--skewVal"
    );

    const skewValNo = parseInt(skewVal);

    if (skewValNo != this.state.skew) {
      const animName = this.state.currentAnimation;

      this.setState(
        { skewChanged: !this.state.skewChanged, currentAnimation: "none" },
        () => {
          this.setState({ currentAnimation: animName });
        }
      );
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === "skew") {
      this.setState({ skewChanged: !this.state.skewChanged });
    }
  };

  setOutputStyle = () => {
    // console.log("setOutputStyle Fn")
    this.setState({ outputStyle: !this.state.outputStyle });
  };

  handleVal = () => {
    return this.state.spacing;
  };

  handleModalOpen = (value) => {
    // console.log("handleModalOpen Fn");
    this.setState({
      modalIsOpen: value,
    });
  };

  render() {
    const { blur, modalIsOpen, skewChanged, skew } = this.state;
    let cssProperties = {};
    if (skewChanged) {
      cssProperties["--skewVal"] = skew;
    }

    return (
      <div className="App" style={cssProperties} ref={this.appRef}>
        <main className="main p-0 m-0">
          {/* <div
            className="font-weight-bold p-3 main-title"
          >
            <h2>React Rotate App</h2>
          
          <h4>
          <span
              className="titleBlur"
              style={{ filter: "blur(" + blur + "px)" }}
            >
              Update CSS Vars
            </span>{" "}
            <span className="titleCol">
              with JS
            </span>
          </h4>
          </div> */}
          <ControlModalContext.Provider
            value={{
              onChanging: this.handleChange,
              onValue: this.state,
              onOutputStyle: this.setOutputStyle,
            }}
          >
            <Header text="React Rotate App">
              <h4>
                <SubHeader classN="titleBlur" text="Update CSS Vars " />
                <SubHeader classN="titleCol" text="with JS " />
              </h4>
            </Header>
            <Controls />
          </ControlModalContext.Provider>
          <Suspense fallback={<p>Loading...</p>}>
            <Photo onState={this.state} />
          </Suspense>
        </main>
        <Footer onModalOpen={this.handleModalOpen} />
        <Suspense fallback={<p>Loading...</p>}>
          <ControlModalContext.Provider
            value={{ modalIsOpen, handleModalOpen: this.handleModalOpen }}
          >
            <ModalComp
              isModalOpen={modalIsOpen}
              handleModalOpen={this.handleModalOpen}
            />
          </ControlModalContext.Provider>
        </Suspense>
      </div>
    );
  }
}

export default App;
