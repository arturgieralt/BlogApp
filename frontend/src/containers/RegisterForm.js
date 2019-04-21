import { connect } from "react-redux";
import { registerUser } from "../actions/users";
import RegisterForm from "../components/RegisterForm/RegisterForm";

const mapDispatchToProps = dispatch => {
  return {
    registerUser: user => dispatch(registerUser(user))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(RegisterForm);
