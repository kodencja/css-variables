import React, { Component } from 'react';
import Photo from './components/photo';
import Controls from './components/controls';
import axios from 'axios';
import './App.css';


class App extends Component {
  state ={
    img: '',
    blur: "7",
    color: "#ffcc44",
    spacing: "10",
    names: ['spacing','blur','color']
  };

  componentDidMount(){
    axios.get('https://images.unsplash.com/photo-1601758282760-b6cc3d07523d?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80', {
      responseType: 'arraybuffer',
      ContentType: 'image/jpg'
    })
    .then(res => {
      this.setState({img: res.config.url})
    });
}

handleChange = (e) => {
  this.setState({ [e.target.name]: e.target.value });
};

handleVal = () => {
  return this.state.spacing;
}

  render(){
  return (
    <main className="main p-0 m-0"><h2 className="font-weight-bold" style={{textAlign: 'center', color: 'aliceblue', backgroundColor: 'cadetblue', padding: '15px'}}>
React App - <span className="titleBlur" style={{filter: "blur(" + this.state.blur + "px)",
            }}>Update CSS Vars</span>  <span className='titleCol' style={{color: this.state.color}}>with JS</span>
    </h2>
      <Controls onChanging={this.handleChange} onVal={this.state} />
      <Photo sorc={this.state.img} onSpacing={this.state.spacing} onBgr={this.state.color} onBlur={this.state.blur} />
    </main>
  );
  }
}



export default App;
