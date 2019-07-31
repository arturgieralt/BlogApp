import React from "react";
import PropTypes from "prop-types";

class FacebookCallback extends React.Component {
  componentDidMount() {
    const urlHash = new URLSearchParams(window.location.hash);
    const token = urlHash.get("#access_token");
    const state = urlHash.get("state");

    const savedState = localStorage.getItem("facebookTokenState");

    if (savedState === state) {
      const { loginUserWithExternalProvider } = this.props;
      loginUserWithExternalProvider(token, "facebook");
    }
  }

  render() {
    return (
      <React.Fragment>
        <p>Please wait, you are being logged in.</p>
      </React.Fragment>
    );
  }
}

FacebookCallback.propTypes = {
  loginUserWithExternalProvider: PropTypes.func.isRequired
};

export default FacebookCallback;
