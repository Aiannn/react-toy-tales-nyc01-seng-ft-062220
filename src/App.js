import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

import data from './data'


class App extends React.Component{

  state = {
    display: false,
    toyArray: []
  }

  deleteToy = (toy) => {
    let obj = {
      method: 'DELETE'
    }
    fetch(`http://localhost:3000/toys/${toy.id}`, obj)
    
    this.setState({
      toyArray: this.filterArray(toy) 
    })
  }

  filterArray = (deletedToy) => {
    return this.state.toyArray.filter(toy => {
      return toy.name !== deletedToy.name 
    })
  }

  componentDidMount() {
    this.changeToyArray()
  }

  changeToyArray = () => {
    fetch('http://localhost:3000/toys')
    .then(resp=>resp.json())
    .then(toys => {
      this.setState({
        toyArray: toys 
      })
    })
  }

  submitHandler = (newToy) => {

    let obj = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: newToy.name,
        image: newToy.image 
      })
    }

    fetch('http://localhost:3000/toys', obj)
    .then(res => res.json())
    .then(newToy => {
      this.setState({
        toyArray: [...this.state.toyArray, newToy]
      })
    })
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm submitHandler={this.submitHandler}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer deleteToy={this.deleteToy} toys={this.state.toyArray}/>
      </>
    );
  }

}

export default App;