import React from "react";
import StyledCard from "../Card/Card";

const Article = article => {
  if (article) {
    return (
      <StyledCard width="90%" margin="20px auto" title={article.title}>
        {article.content}
      </StyledCard>
    );
  }
  return "No such article.";
};

export default Article;
