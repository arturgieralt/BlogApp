import React from "react";
import { v1 } from "uuid";
import { Link } from "react-router-dom";
import Button from "../formElements/Button";

export default class LoginPage extends React.Component {
  onClick = () => {
    const state = v1();
    const clientId = "2560506850634998";
    const redirectUri = "http%3A%2F%2Flocalhost%3A3000%2Flogin%2Ffacebook";

    localStorage.setItem("facebookTokenState", state);
    window.location.replace(
      `https://www.facebook.com/v4.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&response_type=token&scope=email`
    );
  };

  render() {
    return (
      <React.Fragment>
        <Link to="/user/login/form">Login with credentials</Link>
        <Button onClick={this.onClick}>Login with facebook</Button>
      </React.Fragment>
    );
  }
}
