import React, { Component } from "react";

export class MovieForm extends Component {
  state = {
    editedMovie: this.props.movie
  };

  cancelClicked = () => {
    this.props.cancelForm();
  };

  inputChanged = event => {
    let movie = this.state.editedMovie;
    movie[event.target.name] = event.target.value;
    this.setState({
      editedMovie: movie
    });
  };

  saveMovie = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token e16b579ed2ac7fe937dc5ea2b8f4882c6e4b2ed8"
      },
      body: JSON.stringify(this.state.editedMovie)
    })
      .then(res => res.json())
      .then(res => this.props.newMovie(res))
      .catch(err => console.error(err));
  };
  updateMovie = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token e16b579ed2ac7fe937dc5ea2b8f4882c6e4b2ed8"
        },
        body: JSON.stringify(this.state.editedMovie)
      }
    )
      .then(res => res.json())
      .then(res => this.props.editedMovie(res))
      .catch(err => console.error(err));
  };

  render() {
      const isValidated = this.state.editedMovie.title.length === 0 || this.state.editedMovie.description.length === 0
    return (
      <div>
        <span>Title</span>
        <br />
        <input
          type="text"
          name="title"
          value={this.props.movie.title}
          onChange={this.inputChanged}
        />
        <br />
        <span>Description</span>
        <br />
        <textarea
          name="description"
          value={this.props.movie.description}
          onChange={this.inputChanged}
        />
        <br />
        {this.props.movie.id ? (
          <button  disabled={isValidated} onClick={this.updateMovie}>Update</button>
        ) : (
          <button disabled={isValidated} onClick={this.saveMovie}>Save</button>
        )}
        <button onClick={this.cancelClicked}>Cancel</button>
      </div>
    );
  }
}

export default MovieForm;
