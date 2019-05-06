import { connect } from "react-redux";
import { loginUser } from "../actions/users";
import LoginForm from "../components/LoginForm/LoginForm";

const mapDispatchToProps = dispatch => {
  return {
    loginUser: user => dispatch(loginUser(user))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(LoginForm);
