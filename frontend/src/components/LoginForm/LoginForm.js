import React from "react";
import { ReCaptcha } from "react-recaptcha-v3";
import { pipe, all } from "ramda";
import Button from "../formElements/Button";
import Input from "../formElements/Input";
import StyledCard from "../Card/Card";
import ElementLabel from "../formElements/ControlLabel";
import { validateName } from "../formElements/validators";
import updateFormElement from "../formElements/stateSetters";
import { CAPTCHA_KEY } from "../../views/Root";

export default class LoginForm extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleChange(event) {
    event.persist();
    const { target } = event;
    this.setState(updateFormElement(target));
  }

  handleSubmit() {
    // const isFormValid = this.validate();

    //  if (isFormValid) {
    const { email, password } = this.state;
    const { loginUser } = this.props;
    loginUser({ email, password });
    //   }
  }

  validate() {
    const formValidator = pipe(
      validateName(this.state),
      all(condition => condition)
    )([]);

    return formValidator;
  }

  verifyCaptcha = token => {
    const { verifyCaptcha: verifyCaptchaToken } = this.props;
    verifyCaptchaToken(token);
  };

  handleChange = this.handleChange.bind(this);

  handleSubmit = this.handleSubmit.bind(this);

  verifyCaptcha = this.verifyCaptcha.bind(this);

  render() {
    const { email, password } = this.state;
    const { isHuman } = this.props;

    return (
      <StyledCard width="500px" margin="20px auto" title="Login">
        {isHuman ? (
          <React.Fragment>
            <ElementLabel name="Email">
              <Input
                type="text"
                name="email"
                required
                onChange={this.handleChange}
                value={email}
                placeholder="Email..."
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
            <Button type="button" onClick={this.handleSubmit}>
              Login
            </Button>
          </React.Fragment>
        ) : (
          <span>
            The form is locked. Please wait till reCaptcha verify you.
          </span>
        )}
        <ReCaptcha
          sitekey={CAPTCHA_KEY}
          action="login"
          verifyCallback={this.verifyCaptcha}
        />
      </StyledCard>
    );
  }
}
