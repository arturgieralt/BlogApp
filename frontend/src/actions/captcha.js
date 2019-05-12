export const CAPTCHA_VERIFY_REQUEST = "[CAPTCHA]_VERIFY_REQUEST";
export const CAPTCHA_VERIFY_SUCCESS = "[CAPTCHA]_VERIFY_SUCCESS";
export const CAPTCHA_VERIFY_FAILURE = "[CAPTCHA]_VERIFY_FAILURE";

export const verifyCaptcha = token => ({
  type: CAPTCHA_VERIFY_REQUEST,
  token
});

export const verifyCaptchaSuccess = isHuman => ({
  type: CAPTCHA_VERIFY_SUCCESS,
  isHuman
});

export const verifyCaptchaFailure = error => ({
  type: CAPTCHA_VERIFY_FAILURE,
  error
});
