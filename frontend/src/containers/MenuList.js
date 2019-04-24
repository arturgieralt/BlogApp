import { connect } from "react-redux";
import MenuList from "../components/Menu/MenuList";
import { isAdmin, isAuthenticated } from "../store/selectors";

const mapStateToProps = state => {
  return {
    isAdmin: isAdmin(state),
    user: state.user,
    isAuthenticated: isAuthenticated(state)
  };
};

export default connect(mapStateToProps)(MenuList);
