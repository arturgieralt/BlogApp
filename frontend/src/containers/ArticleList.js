import { connect } from "react-redux";
import ArticlesList from "../components/ArticleList/ArticleList";
import { fetchArticles, queryArticles } from "../actions/articles";

const mapStateToProps = state => {
  return {
    articles: state.articles.summary,
    isLoading: state.loaders.articles
  };
};

const mapDispatchToProps = {
  fetchArticles,
  queryArticles
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlesList);
