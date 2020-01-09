import React, { Component } from "react";
let FontAwesome = require("react-fontawesome");

export class MovieList extends Component {
  render(props) {
    const movieClicked = movie => e => {
      this.props.movieClicked(movie);
    };

    const deleteMovie = movie => e => {
      fetch(`${process.env.REACT_APP_API_URL}/api/movies/${movie.id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Token ${this.state.token}`
        }
      })
        .then(res => this.props.movieDeleted(movie))
        .catch(err => console.error(err));
    };

    const editMovie = movie => e => {
      this.props.editMovie(movie);
    };

    const addMovie = () =>{
        this.props.addMovie()
    }

    return (
      <div>
        {this.props.movies.map(movie => {
          return (
            <div key={movie.id} className="movie-item">
              <h3 onClick={movieClicked(movie)}>
                <div className="movie-title">{movie.title}</div>
              </h3>
              <FontAwesome name="edit" onClick={editMovie(movie)} />
              <FontAwesome name="trash" onClick={deleteMovie(movie)} />
            </div>
          );
        })}
        <button onClick={addMovie}>Add New movie</button>
      </div>
    );
  }
}

export default MovieList;
