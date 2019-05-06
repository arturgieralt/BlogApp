import { connect } from "react-redux";
import MenuList from "../components/Menu/MenuList";
import { isAdmin, isAuthenticated } from "../store/selectors";
import { logoutUser } from "../actions/users";

const mapStateToProps = state => {
  return {
    isAdmin: isAdmin(state),
    user: state.user,
    isAuthenticated: isAuthenticated(state)
  };
};

const mapDispatchToProps = {
  logout: logoutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuList);
