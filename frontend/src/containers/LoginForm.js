import { connect } from "react-redux";
import { loginUser } from "../actions/users";
import LoginForm from "../components/LoginForm/LoginForm";
import { verifyCaptcha } from "../actions/captcha";

const mapDispatchToProps = {
  loginUser,
  verifyCaptcha
};

export default connect(
  null,
  mapDispatchToProps
)(LoginForm);
