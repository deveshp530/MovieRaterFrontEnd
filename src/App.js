import React, { Component } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import MovieForm from "./components/MovieForm";

class App extends Component {
  state = {
    movies: [],
    selectedMovie: null,
    editedMovie: null
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
    })
  };

  cancelForm = () => {
    this.setState({
      editedMovie: null
    })
  };

  addMovie = () => {
    this.setState({
      editedMovie: {
        title: '',
        descrition: ''
      }
    })
  };

newMovie = movie =>{
  this.setState({
    movies: [...this.state.movies, movie]
  })
}

  

  render() {
    return (
      <div className="App">
        <h1>Movie Rater</h1>
        <div className="layout">
          <MovieList
            movies={this.state.movies}
            movieClicked={this.loadMovie}
            movieDeleted={this.movieDeleted}
            editMovie={this.editMovie}
            addMovie={this.addMovie}
          />
          <div>
            { !this.state.editedMovie ? 
              <MovieDetail
              movie={this.state.selectedMovie}
              updateMovie={this.loadMovie}
            />
             : <MovieForm 
             movie={this.state.editedMovie} 
             cancelForm={this.cancelForm}
             newMovie={this.newMovie}
             editedMovie={this.loadMovie}
             />}
            
            
          </div>
        </div>
      </div>
    );
  }
}

export default App;
