import { connect } from "react-redux";
import { fetchTags } from "../actions/tags";
import TagList from "../components/TagList/TagList";

const mapStateToProps = state => {
  return {
    tags: state.tags
  };
};

const mapDispatchToProps = {
  fetchTags
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagList);
