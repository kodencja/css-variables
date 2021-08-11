import React, { Component, lazy, Suspense } from "react";
// import Photo from "./components/Photo";
import Controls from "./components/Controls";
// import axios from "axios";
// import "./App.css";
import Footer from "./footer/Footer";
import './css/style.css'

const Photo = lazy(() => import("./components/Photo"));
const ModalComp = lazy(() => import("./footer/ModalComp"));

export const ControlModalContext = React.createContext();

class App extends Component {
  state = {
    img: "",
    blur: "2",
    color: "#ffffff",
    bgrCol: "forestgreen",
    skew: 0,
    rotatex: 0,
    rotatey: 0,
    spacing: 20,
    transOrigX: 50,
    transOrigY: 50,
    transOrigZ: 0,
    animation: 'animRotate',
    modalIsOpen: false,
    outputStyle: false,
  };

  // componentDidMount() {
  // axios
  //   .get(
  //     "https://images.unsplash.com/photo-1601758282760-b6cc3d07523d?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
  //     {
  //       responseType: "arraybuffer",
  //       ContentType: "image/jpg",
  //     }
  //   )
  //   .then((res) => {
  //     this.setState({ img: res.config.url });
  //   });
  // }

  // componentDidUpdate(){
  //   console.log(this.state.outputStyle);
  //   console.log(this.state.rotatex);
  // }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  setOutputStyle = (val) =>{
    // this.setState({...this.state, outputStyle: this.state.outputStyle+val});
    this.setState({outputStyle: !this.state.outputStyle});
    // this.setState({outputStyle: true});
    // this.setState((prevState)=> ({
    //   outputStyle: prevState.outputStyle + val
    // }));
  }

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
    const { blur, color, modalIsOpen } = this.state;

    return (
      <div className="App">
        <main className="main p-0 m-0">
          <h2
            className="font-weight-bold p-3"
          >
            React Rotate App -{" "}
            <span
              className="titleBlur"
              style={{ filter: "blur(" + blur + "px)" }}
            >
              Update CSS Vars
            </span>{" "}
            <span className="titleCol" style={{ color: color }}>
              with JS
            </span>
          </h2>
          <ControlModalContext.Provider
            value={{ onChanging: this.handleChange, onValue: this.state, onOutputStyle: this.setOutputStyle}}
          >
            <Controls />
          </ControlModalContext.Provider>
          <Suspense fallback={<p>Loading...</p>}>
            {/* <Photo sorc={img} onSpacing={spacing} onBgr={color} onBlur={blur} /> */}
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
