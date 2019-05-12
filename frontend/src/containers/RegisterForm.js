import { connect } from "react-redux";
import { registerUser } from "../actions/users";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import { verifyCaptcha } from "../actions/captcha";
import { isHuman } from "../store/selectors";

const mapStateToProps = state => {
  return {
    isHuman: isHuman(state)
  };
};

const mapDispatchToProps = {
  registerUser,
  verifyCaptcha
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm);
