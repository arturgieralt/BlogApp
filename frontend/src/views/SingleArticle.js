import { connect } from "react-redux";
import SingleArticle from "../components/Article/Article";
import { fetchArticle } from "../actions/articles";
import { isAuthenticated } from "../store/selectors";

const mapDispatchToProps = dispatch => {
  return {
    fetchArticle: id => dispatch(fetchArticle(id))
  };
};

const mapStateToProps = (state, ownProps) => ({
  article: state.articles.full[ownProps.match.params.id],
  user: state.user,
  isAuthenticated: isAuthenticated(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleArticle);
