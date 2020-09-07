import React, { Component } from 'react';

class ToyCard extends Component {

  state = {
    likes: this.props.toy.likes
  }

  deleteToy = () => {
    this.props.deleteToy(this.props.toy)
  }

  increaseLikes = () => {
    this.setState({          
      likes: this.state.likes + 1
    })
    let toyId = this.props.toy.id

    let obj = {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        likes: this.state.likes 
      })
    }

    fetch(`http://localhost:3000/toys/${toyId}`, obj)
    .then(response => response.json())
    .then(data => console.log(data))
  }

  render() {
    return (
      <div className="card">
        <h2>{this.props.toy.name}</h2>
        <img src={this.props.toy.image} alt={this.props.toy.name} className="toy-avatar" />
        <p>{this.state.likes} Likes </p>
        <button onClick={this.increaseLikes} className="like-btn">Like {'<3'}</button>
        <button onClick={this.deleteToy} className="del-btn">Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
