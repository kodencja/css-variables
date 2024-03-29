import React, { Component, lazy, Suspense } from "react";
import Controls from "./components/Controls";
import Footer from "./footer/Footer";
import 'bootstrap/dist/css/bootstrap.css';
import './css/style.css'

const Photo = lazy(() => import("./components/Photo"));
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
    animation: 'animRotateXYZ',
    modalIsOpen: false,
    outputStyle: false,
  };

  appRef = React.createRef();

  componentDidUpdate(){
    
    const skewVal = getComputedStyle(this.appRef.current).getPropertyValue("--skewVal");

    const skewValNo = parseInt(skewVal);

    if(skewValNo != this.state.skew){
      const animName = this.state.animation;

      this.setState({skewChanged: !this.state.skewChanged, animation: 'none'}, ()=>{
        this.setState({animation: animName});
      })
    }  
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if(e.target.name === 'skew'){
      this.setState({skewChanged: !this.state.skewChanged})
    }
  };

  setOutputStyle = () =>{
    // console.log("setOutputStyle Fn")
    this.setState({outputStyle: !this.state.outputStyle});
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
    const { blur, modalIsOpen, skewChanged, skew } = this.state;
    let cssProperties={};
    if(skewChanged){
      cssProperties["--skewVal"] = skew;
    }


    return (
      <div className="App" style={cssProperties} ref={this.appRef}>

        <main className="main p-0 m-0">
          <div
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
          </div>
          <ControlModalContext.Provider
            value={{ onChanging: this.handleChange, onValue: this.state, onOutputStyle: this.setOutputStyle}}
          >
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
