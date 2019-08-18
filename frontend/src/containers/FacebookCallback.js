import { connect } from "react-redux";
import { loginUserWithExternalProvider } from "../actions/users";
import FacebookCallback from "../components/FacebookCallback/FacebookCallback";

const mapDispatchToProps = {
  loginUserWithExternalProvider
};

export default connect(
  null,
  mapDispatchToProps
)(FacebookCallback);
