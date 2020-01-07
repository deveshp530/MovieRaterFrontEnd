import React, { Component } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";

class App extends Component {
  state = {
    movies: [],
    selectedMovie: null,
  };

  componentDidMount() {
    fetch("http://localhost:8000/api/movies/", {
      method: "GET",
      headers: {
        Authorization: "Token e16b579ed2ac7fe937dc5ea2b8f4882c6e4b2ed8"
      }
    })
      .then(res => res.json())
      .then(res =>
        this.setState({
          movies: res
        })
      )
      .catch(err => console.error(err));
  }

  movieClicked = movie => {
    this.setState({selectedMovie: movie})
  }

  render() {
    return (
      <div className="App">
        <div className="layout">
          <MovieList movies={this.state.movies} movieClicked={this.movieClicked} />
          <MovieDetail movie ={this.state.selectedMovie} />
        </div>
      </div>
    );
  }
}

export default App;
