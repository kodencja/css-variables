import React, { Component, lazy, Suspense } from "react";
// import Photo from "./components/Photo";
import Controls from "./components/Controls";
// import axios from "axios";
import "./App.css";
import Footer from "./footer/Footer";

const Photo = lazy(() => import("./components/Photo"));
const ModalComp = lazy(() => import("./footer/ModalComp"));

export const ModalContext = React.createContext();

class App extends Component {
  state = {
    img: "",
    blur: "7",
    color: "#ffcc44",
    spacing: "10",
    names: ["spacing", "blur", "color"],
    modalIsOpen: false,
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

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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
    const { blur, color, spacing, modalIsOpen } = this.state;

    return (
      <div className="App">
        <main className="main p-0 m-0">
          <h2
            className="font-weight-bold"
            style={{
              textAlign: "center",
              color: "aliceblue",
              backgroundColor: "cadetblue",
              padding: "15px",
            }}
          >
            React App -{" "}
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
          <ModalContext.Provider
            value={{ onChanging: this.handleChange, onValue: this.state }}
          >
            <Controls />
          </ModalContext.Provider>
          <Suspense fallback={<p>Loading...</p>}>
            {/* <Photo sorc={img} onSpacing={spacing} onBgr={color} onBlur={blur} /> */}
            <Photo onSpacing={spacing} onBgr={color} onBlur={blur} />
          </Suspense>
        </main>
        <Footer onModalOpen={this.handleModalOpen} />
        <Suspense fallback={<p>Loading...</p>}>
          <ModalContext.Provider
            value={{ modalIsOpen, handleModalOpen: this.handleModalOpen }}
          >
            <ModalComp
              isModalOpen={modalIsOpen}
              handleModalOpen={this.handleModalOpen}
            />
          </ModalContext.Provider>
        </Suspense>
      </div>
    );
  }
}

export default App;
