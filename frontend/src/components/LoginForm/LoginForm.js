import React from "react";
import { pipe, all } from "ramda";
import Button from "../formElements/Button";
import Input from "../formElements/Input";
import StyledCard from "../Card/Card";
import ElementLabel from "../formElements/ControlLabel";
import { validateName } from "../formElements/validators";
import updateFormElement from "../formElements/stateSetters";

export default class LoginForm extends React.Component {
  state = {
    name: "",
    password: ""
  };

  handleChange(event) {
    event.persist();
    const { target } = event;
    this.setState(updateFormElement(target));
  }

  handleSubmit() {
    const isFormValid = this.validate();

    if (isFormValid) {
      const { name, password } = this.state;
      const { loginUser } = this.props;
      loginUser({ name, password });
    }
  }

  validate() {
    const formValidator = pipe(
      validateName(this.state),
      all(condition => condition)
    )([]);

    return formValidator;
  }

  handleChange = this.handleChange.bind(this);

  handleSubmit = this.handleSubmit.bind(this);

  render() {
    const { name, password } = this.state;

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
      </StyledCard>
    );
  }
}
