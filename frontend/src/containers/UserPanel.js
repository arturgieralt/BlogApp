import { connect } from "react-redux";
import UserPanel from "../components/UserPanel/UserPanel";
import { isAuthenticated, isActive } from "../store/selectors";
import { verifyUser, removeUser } from "../actions/users";
import { uploadAvatar } from "../actions/avatar";

const mapStateToProps = state => {
  return {
    user: state.user,
    isAuthenticated: isAuthenticated(state),
    isActive: isActive(state)
  };
};

const mapDispatchToProps = {
  verifyUser,
  removeUser,
  uploadAvatar
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPanel);
