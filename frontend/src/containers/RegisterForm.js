import { connect } from "react-redux";
import { registerUser } from "../actions/users";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import { verifyCaptcha } from "../actions/captcha";

const mapDispatchToProps = {
  registerUser,
  verifyCaptcha
};
export default connect(
  null,
  mapDispatchToProps
)(RegisterForm);
