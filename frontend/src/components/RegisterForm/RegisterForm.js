import React from "react";
import { pipe, all } from "ramda";
import { ReCaptcha } from "react-recaptcha-v3";
import PropTypes from "prop-types";
import Button from "../formElements/Button";
import Input from "../formElements/Input";
import StyledCard from "../Card/Card";
import ElementLabel from "../formElements/ControlLabel";
import {
  validateName,
  validateEmail,
  validatePassword
} from "../formElements/validators";
import updateFormElement from "../formElements/stateSetters";
import { CAPTCHA_KEY } from "../../views/Root";

export default class RegisterForm extends React.Component {
  state = {
    name: "",
    email: "",
    emailCheck: "",
    password: "",
    passwordCheck: ""
  };

  handleChange(event) {
    event.persist();
    const { target } = event;
    this.setState(updateFormElement(target));
  }

  handleSubmit() {
    const isFormValid = this.validate();

    if (isFormValid) {
      const { name, email, password } = this.state;
      const { registerUser } = this.props;
      registerUser({
        name,
        email,
        password
      });
    }
    console.log(isFormValid);
  }

  validate() {
    const formValidator = pipe(
      validateName(this.state),
      validateEmail(this.state),
      validatePassword(this.state),
      all(condition => condition)
    )([]);

    return formValidator;
  }

  verifyCaptcha = token => {
    const { verifyCaptcha: verifyCaptchaToken } = this.props;
    verifyCaptchaToken(token);
  };

  verifyCaptcha = this.verifyCaptcha.bind(this);

  handleChange = this.handleChange.bind(this);

  handleSubmit = this.handleSubmit.bind(this);

  render() {
    const { name, password, passwordCheck, email, emailCheck } = this.state;
    const { isHuman } = this.props;
    return (
      <StyledCard width="500px" margin="20px auto" title="Register">
        {isHuman ? (
          <React.Fragment>
            <ElementLabel name="Name">
              <Input
                type="text"
                name="name"
                required
                onChange={this.handleChange}
                value={name}
                placeholder="Name..."
              />
            </ElementLabel>
            <ElementLabel name="Email">
              <Input
                type="email"
                name="email"
                required
                onChange={this.handleChange}
                value={email}
                placeholder="Email..."
              />
            </ElementLabel>
            <ElementLabel name="Repeat Email">
              <Input
                type="email"
                name="emailCheck"
                required
                onChange={this.handleChange}
                value={emailCheck}
                placeholder="Repet Email..."
              />
            </ElementLabel>
            <ElementLabel name="Password">
              <Input
                type="password"
                name="password"
                required
                pattern=".{5,10}"
                onChange={this.handleChange}
                value={password}
                placeholder="Password..."
              />
            </ElementLabel>
            <ElementLabel name="Repeat password">
              <Input
                type="password"
                name="passwordCheck"
                required
                pattern=".{5,10}"
                onChange={this.handleChange}
                value={passwordCheck}
                placeholder="Repeat password..."
              />
            </ElementLabel>
            <Button type="button" onClick={this.handleSubmit}>
              Register
            </Button>
          </React.Fragment>
        ) : (
          <span>
            The form is locked. Please wait till reCaptcha verify you.
          </span>
        )}
        <ReCaptcha
          sitekey={CAPTCHA_KEY}
          action="register"
          verifyCallback={this.verifyCaptcha}
        />
      </StyledCard>
    );
  }
}

RegisterForm.propTypes = {
  registerUser: PropTypes.func.isRequired
};
