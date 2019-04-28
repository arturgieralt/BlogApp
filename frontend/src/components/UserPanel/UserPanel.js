import React from "react";
import JwtDecode from "jwt-decode";
import * as R from "ramda";
import PropTypes from "prop-types";
import Button from "../formElements/Button";
import StyledCard from "../Card/Card";
import ElementLabel from "../formElements/ControlLabel";
import updateFormElement from "../formElements/stateSetters";
import TextArea from "../formElements/TextArea";

export default class UserPanel extends React.Component {
  state = {
    verifyToken: ""
  };

  handleChange(event) {
    event.persist();
    const { target } = event;
    this.setState(updateFormElement(target));
  }

  handleSubmit() {
    const { verifyToken } = this.state;
    const isFormValid = this.validate();

    if (isFormValid) {
      const { verifyUser } = this.props;
      verifyUser(verifyToken);
    }
  }

  validate() {
    const { verifyToken } = this.state;
    const decodedToken = JwtDecode(verifyToken);
    return !R.isNil(decodedToken);
  }

  handleChange = this.handleChange.bind(this);

  handleSubmit = this.handleSubmit.bind(this);

  render() {
    const { verifyToken } = this.state;
    const {
      isActive,
      user: { claims }
    } = this.props;

    return (
      <React.Fragment>
        <StyledCard margin="20px auto" title={`Welcome ${claims.name}`}>
          You can manage your account here.
        </StyledCard>
        {!isActive && (
          <StyledCard width="500px" margin="20px auto" title="Verify account">
            <ElementLabel name="Paste your token here">
              <TextArea name="verifyToken" onChange={this.handleChange}>
                {verifyToken}
              </TextArea>
            </ElementLabel>
            <Button type="button" onClick={this.handleSubmit}>
              Register
            </Button>
          </StyledCard>
        )}
      </React.Fragment>
    );
  }
}

UserPanel.propTypes = {
  verifyUser: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};
