import React from "react";
import { path } from "ramda";
import * as io from "socket.io-client";
import PropTypes from "prop-types";
import StyledCard from "../Card/Card";
import TextArea from "../formElements/TextArea";
import Button from "../formElements/Button";
import updateFormElement from "../formElements/stateSetters";

class Article extends React.Component {
  state = {
    comment: "",
    socket: null
  };

  componentDidMount() {
    const articleId = path(["match", "params", "id"], this.props);
    if (articleId) {
      const { fetchArticle } = this.props;
      fetchArticle(articleId);
    }
    const { isAuthenticated, user } = this.props;

    if (isAuthenticated) {
      const socket = io.connect("https://localhost:3001/commentStream", {
        query: {
          token: user.token,
          articleId
        }
      });

      socket.on("new comment", function(msg) {
        console.log(msg);
      });

      socket.on("all comments", function(msg) {
        console.log(msg);
      });

      this.setState({
        socket
      });
    }
  }

  handleChange(event) {
    event.persist();
    const { target } = event;
    this.setState(updateFormElement(target));
  }

  addComment() {
    const { socket, comment } = this.state;
    socket.emit("message", comment);
  }

  addComment = this.addComment.bind(this);

  handleChange = this.handleChange.bind(this);

  render() {
    const { article, isAuthenticated } = this.props;
    const { comment } = this.state;
    if (article) {
      return (
        <React.Fragment>
          <StyledCard width="90%" margin="20px auto" title={article.title}>
            Added: {article.created_date}
            Content:
            {article.content}
            Author:
            {path(["author", "name"], article)}
          </StyledCard>
          {isAuthenticated && (
            <StyledCard width="90%" margin="20px auto" title="Add comment">
              <TextArea
                name="comment"
                value={comment}
                onChange={this.handleChange}
              />
              <Button type="button" onClick={this.addComment}>
                Send
              </Button>
            </StyledCard>
          )}
          <StyledCard width="90%" margin="20px auto" title="Comments">
            {article.comments.map(com => (
              <div key={com._id}>{com.content}</div>
            ))}
          </StyledCard>
        </React.Fragment>
      );
    }
    return "No such article.";
  }
}

Article.propTypes = {
  fetchArticle: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired
};

export default Article;
