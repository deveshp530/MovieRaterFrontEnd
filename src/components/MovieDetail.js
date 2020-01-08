import React, { Component } from "react";
let FontAwesome = require("react-fontawesome");

export class MovieDetail extends Component {
  state = {
    highlighted: -1
  };

  highlightRate = highlight => e => {
    this.setState({
      highlighted: highlight
    });
  };

  rateClicked = stars => e => {
    fetch(
      `${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/rate_movie/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token e16b579ed2ac7fe937dc5ea2b8f4882c6e4b2ed8"
        },
        body: JSON.stringify({
          stars: stars + 1
        })
      }
    )
      .then(res => res.json())
      .then(res => this.getDetails())
      .catch(err => console.error(err));
  };

  getDetails = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token e16b579ed2ac7fe937dc5ea2b8f4882c6e4b2ed8"
        },
      }
    )
      .then(res => res.json())
      .then(res => this.props.updateMovie(res ))
      .catch(err => console.error(err));
  };
  render() {
    const mov = this.props.movie;
    return (
      <div>
        {this.props.movie ? (
          <div>
            <h3>{mov.title}</h3>
            <FontAwesome
              name="star"
              className={mov.avg_ratings > 0 ? "black" : ""}
            />
            <FontAwesome
              name="star"
              className={mov.avg_ratings > 1 ? "black" : ""}
            />
            <FontAwesome
              name="star"
              className={mov.avg_ratings > 2 ? "black" : ""}
            />
            <FontAwesome
              name="star"
              className={mov.avg_ratings > 3 ? "black" : ""}
            />
            <FontAwesome
              name="star"
              className={mov.avg_ratings > 4 ? "black" : ""}
            />
            ({mov.no_of_ratings})<p>{mov.description}</p>
            <div className="rate-container">
              <h2>Rate it!!</h2>
              {[...Array(5)].map((e, index) => {
                return (
                  <FontAwesome
                    key={index}
                    name="star"
                    className={
                      this.state.highlighted > index - 1 ? "purple" : ""
                    }
                    onMouseEnter={this.highlightRate(index)}
                    onMouseLeave={this.highlightRate(-1)}
                    onClick={this.rateClicked(index)}                   
                  />
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default MovieDetail;
