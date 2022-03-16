import React, { Component } from "react";

export default class UserLogout extends Component {
  logout = () => {
    window.location.href = "/login";
  };

  render() {
    return <button onClick={this.logout}>Logout</button>;
  }
}
