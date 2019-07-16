import React from "react";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import * as R from "ramda";

export default class ArticlesList extends React.Component {
  componentDidMount() {
    const path = R.path(["match", "path"], this.props);
    this.fetchData(path);
  }

  componentDidUpdate(prevProps) {
    const prevPath = R.path(["match", "path"], prevProps);
    const path = R.path(["match", "path"], this.props);
    if (prevPath !== path) {
      this.fetchData(path);
    }
    return undefined;
  }

  fetchData(path) {
    const { fetchArticles, queryArticles } = this.props;
    const tag = R.path(["match", "params", "tag"], this.props);
    switch (path) {
      case "/tags/:tag":
        return queryArticles(R.isNil(tag) ? {} : { tags: [tag] });
      default:
        return fetchArticles();
    }
  }

  render() {
    const { articles, isLoading } = this.props;

    if (isLoading) {
      return <Loader type="Oval" color="red" height={80} width={80} />;
    }
    if (articles.length === 0) {
      return "No posts.";
    }

    return articles.map(article => {
      return (
        <div key={article.id}>
          <h2>
            <Link to={`/articles/${article._id}`}>{article.title}</Link>
          </h2>
          <p>Added on {article.created_date}</p>
          <p>{article.summary}</p>
        </div>
      );
    });
  }
}
