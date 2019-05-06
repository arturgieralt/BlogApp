import React from "react";
import { Link } from "react-router-dom";

export default class ArticlesList extends React.Component {
  componentDidMount() {
    const { fetchArticles } = this.props;
    fetchArticles();
  }

  render() {
    const { articles } = this.props;
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
