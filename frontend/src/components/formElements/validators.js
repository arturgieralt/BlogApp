import { prop } from "ramda";

function isValidEmailAddress(value) {
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return re.test(String(value).toLowerCase());
}

export const validatePassword = state => formValidationResult => {
  const pass = prop("password", state);
  const passCheck = prop("passwordCheck", state);

  return [...formValidationResult, pass && passCheck && pass === passCheck];
};

export const validateEmail = state => formValidationResult => {
  const email = prop("email", state);
  const emailCheck = prop("emailCheck", state);

  return [
    ...formValidationResult,
    email && emailCheck && email === emailCheck && isValidEmailAddress(email)
  ];
};

export const validateName = state => formValidationResult => {
  const name = prop("name", state);

  return [...formValidationResult, name && name.length > 6];
};
