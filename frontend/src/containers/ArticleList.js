import { connect } from "react-redux";
import ArticlesList from "../components/ArticleList/ArticleList";

const mapStateToProps = state => {
  return {
    articles: state.articles
  };
};

export default connect(mapStateToProps)(ArticlesList);
