import { connect } from "react-redux";
import UserPanel from "../components/UserPanel/UserPanel";
import { isAuthenticated, isActive } from "../store/selectors";
import { verifyUser } from "../actions/users";

const mapStateToProps = state => {
  return {
    user: state.user,
    isAuthenticated: isAuthenticated(state),
    isActive: isActive(state)
  };
};

const mapDispatchToProps = {
  verifyUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPanel);
