import { connect } from "react-redux";
import ArticlesList from "../components/ArticleList/ArticleList";
import { fetchArticles } from "../actions/articles";

const mapStateToProps = state => {
  return {
    articles: state.articles.summary
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchArticles: () => dispatch(fetchArticles())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlesList);
