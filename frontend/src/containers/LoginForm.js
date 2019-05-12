import { connect } from "react-redux";
import { loginUser } from "../actions/users";
import LoginForm from "../components/LoginForm/LoginForm";
import { verifyCaptcha } from "../actions/captcha";
import { isHuman } from "../store/selectors";

const mapDispatchToProps = {
  loginUser,
  verifyCaptcha
};

const mapStateToProps = state => {
  return {
    isHuman: isHuman(state)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
