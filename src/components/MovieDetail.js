import React, { Component } from "react";

export class MovieDetail extends Component {
  render() {
    return (
      <div>
        {this.props.movie ? (
          <div>
            <h3>{this.props.movie.title}</h3>
            <p>{this.props.movie.description}</p>
          </div>
        ) : null}
      </div>
    );
  }
}

export default MovieDetail;
