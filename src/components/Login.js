import React, { Component } from "react";
import { withCookies } from "react-cookie";

export class Login extends Component {
  state = {
    credentials: {
      username: "",
      password: ""
    },
    isLoginView: true
  };

  inputChanged = event => {
    let credentials = this.state.credentials;
    credentials[event.target.name] = event.target.value;
    this.setState({
      credentials: credentials
    });
  };
  login = e => {
    if (this.state.isLoginView) {
      fetch(`${process.env.REACT_APP_API_URL}/auth/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state.credentials)
      })
        .then(res => res.json())
        .then(res => {
          this.props.cookies.set("mr-token", res.token);
          window.location.href = "/movies";
        })
        .catch(err => console.error(err));
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/api/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state.credentials)
      })
        .then(res => res.json())
        .then(res => {
          this.setState({
            isLoginView: true
          });
        })
        .catch(err => console.error(err));
    }
  };

  toggleView = () => {
    this.setState({
      isLoginView: !this.state.isLoginView
    });
  };
  render() {
    return (
      <div className="login-container">
        <h1>{this.state.isLoginView ? "Login" : "Register"}</h1>
        <span>Username</span>
        <br />
        <input
          type="text"
          name="username"
          value={this.state.credentials.username}
          onChange={this.inputChanged}
        />
        <span>Password</span>
        <br />
        <input
          type="password"
          name="password"
          value={this.state.credentials.password}
          onChange={this.inputChanged}
        />
        <button onClick={this.login}>
          {this.state.isLoginView ? "Login" : "Register"}
        </button>
        <p onClick={this.toggleView}>
          {this.state.isLoginView ? "Register" : "back to login"}
        </p>
      </div>
    );
  }
}

export default withCookies(Login);
