import React from 'react';
import { Link } from 'react-router-dom';
export function ArticlesList({ articles }) {
  if (articles.length === 0) {
    return 'No posts.';
  }

  return articles.map((article, index) => {
    return (
      <div>
        <h2>
          <Link to={'/articles/' + article._id}>{article.title}</Link>
        </h2>
        <p>Added on {article.created_date}</p>
        <p>{article.summary ? article.summary : article.content.substring(0, 200)} </p>
      </div>
    );
  });
}
