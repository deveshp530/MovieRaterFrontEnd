import React, { Component } from "react";
import { withCookies } from "react-cookie";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import MovieForm from "./components/MovieForm";
let FontAwesome = require("react-fontawesome");

class App extends Component {
  state = {
    movies: [],
    selectedMovie: null,
    editedMovie: null,
    token: this.props.cookies.get("mr-token")
  };

  componentDidMount() {
    if (this.state.token) {
      fetch("http://localhost:8000/api/movies/", {
        method: "GET",
        headers: {
          'Authorization': `Token ${this.state.token}`
        }
      })
        .then(res => res.json())
        .then(res =>
          this.setState({
            movies: res
          })
        )
        .catch(err => console.error(err));
    } else {
      window.location.href = "/";
    }
  }

  loadMovie = movie => {
    this.setState({
      selectedMovie: movie,
      editedMovie: null
    });
  };
  movieDeleted = selMovie => {
    const movies = this.state.movies.filter(movie => movie.id !== selMovie.id);
    this.setState({
      movies: movies,
      selectedMovie: null
    });
  };

  editMovie = selMovie => {
    this.setState({
      editedMovie: selMovie
    });
  };

  cancelForm = () => {
    this.setState({
      editedMovie: null
    });
  };

  addMovie = () => {
    this.setState({
      editedMovie: {
        title: "",
        descrition: ""
      }
    });
  };

  newMovie = movie => {
    this.setState({
      movies: [...this.state.movies, movie]
    });
  };

  render() {
    return (
      <div className="App">
        <h1>
          <FontAwesome name="film" />
          <span>Movie Rater</span>
        </h1>
        <div className="layout">
          <MovieList
            movies={this.state.movies}
            movieClicked={this.loadMovie}
            token={this.state.token}
            movieDeleted={this.movieDeleted}
            editMovie={this.editMovie}
            addMovie={this.addMovie}
          />
          <div>
            {!this.state.editedMovie ? (
              <MovieDetail
                movie={this.state.selectedMovie}
                token={this.state.token}
                updateMovie={this.loadMovie}
              />
            ) : (
              <MovieForm
                movie={this.state.editedMovie}
                cancelForm={this.cancelForm}
                newMovie={this.newMovie}
                token={this.state.token}
                editedMovie={this.loadMovie}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withCookies(App);
