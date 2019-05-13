import { connect } from "react-redux";
import { compose } from "ramda";
import Can from "../components/Can/Can";

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default compose(
  connect(mapStateToProps),
  Can
);
