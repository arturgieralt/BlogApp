import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Article from "../components/Article/Article";

const SingleArticle = ({ match, articles }) => {
  if (articles && match.params.id) {
    const article = articles.find(art => art._id === match.params.id);
    return <Article article={article} />;
  }
  return <div>Article is not found</div>;
};

SingleArticle.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({
  articles: state.articles
});

export default withRouter(connect(mapStateToProps)(SingleArticle));
