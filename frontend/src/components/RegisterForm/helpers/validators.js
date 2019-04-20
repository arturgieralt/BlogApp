import { prop } from "ramda";

export const validatePassword = state => formValidationResult => {
  const pass = prop("password", state);
  const passCheck = prop("passwordCheck", state);

  return [...formValidationResult, pass && passCheck && pass === passCheck];
};

export const validateEmail = state => formValidationResult => {
  const email = prop("email", state);
  const emailCheck = prop("emailCheck", state);

  return [...formValidationResult, email && emailCheck && email === emailCheck];
};

export const validateName = state => formValidationResult => {
  const name = prop("name", state);

  return [...formValidationResult, name && name.length > 6];
};
