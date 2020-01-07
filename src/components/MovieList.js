import React, { Component } from "react";

export class MovieList extends Component {
  render(props) {
    const movieClicked = movie => e => {
      this.props.movieClicked(movie);
    };

    return (
      <div>
        {this.props.movies.map(movie => {
          return (
            <h3 key={movie.id} onClick={movieClicked(movie)}>
              {movie.title}
            </h3>
          );
        })}
      </div>
    );
  }
}

export default MovieList;
