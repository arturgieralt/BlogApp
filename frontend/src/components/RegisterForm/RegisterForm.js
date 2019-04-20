import React from "react";
import { pipe } from "ramda";
import Button from "../formElements/Button";
import Input from "../formElements/Input";
import StyledCard from "../Card/Card";
import ElementLabel from "../formElements/ControlLabel";
import {
  validateName,
  validateEmail,
  validatePassword
} from "./helpers/validators";

export default class RegisterForm extends React.Component {
  state = {
    name: "",
    email: "",
    emailCheck: "",
    password: "",
    passwordCheck: ""
  };

  handleChange(event) {
    const { type, name, value, checked } = event.target;
    switch (type) {
      case "checkbox":
        this.setState({
          [name]: checked
        });
        break;
      case "text":
      case "email":
      case "password":
      case "textarea":
        this.setState({
          [name]: value
        });
        break;
      default:
        break;
    }
  }

  handleSubmit() {
    const isFormValid = this.validate();
    console.log(isFormValid);
  }

  validate() {
    const formValidator = pipe(
      validateName(this.state),
      validateEmail(this.state),
      validatePassword(this.state)
    )([]);

    return formValidator.every(condition => condition);
  }

  handleChange = this.handleChange.bind(this);

  handleSubmit = this.handleSubmit.bind(this);

  render() {
    const { name, password, passwordCheck, email, emailCheck } = this.state;

    return (
      <StyledCard width="90%" margin="20px auto" title="Register">
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
      </StyledCard>
    );
  }
}
