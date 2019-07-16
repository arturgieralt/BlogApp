/* eslint-disable react/no-unused-state */

import React from "react";
import { path, pathOr } from "ramda";
import * as io from "socket.io-client";
import PropTypes from "prop-types";
import StyledCard from "../Card/Card";
import TextArea from "../formElements/TextArea";
import Button from "../formElements/Button";
import updateFormElement from "../formElements/stateSetters";

class Article extends React.Component {
  static getDerivedStateFromProps(props, state) {
    const newComments = pathOr([], ["article", "comments"], props);
    const oldComments = pathOr([], ["commentsDefault"], state);

    if (newComments.length !== oldComments.length) {
      return {
        commentsDefault: newComments,
        commentsLive: newComments
      };
    }
    return null;
  }

  state = {
    comment: "",
    socket: null,
    commentsDefault: [],
    commentsLive: [],
    usersLive: []
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

      socket.on("roomUpdate", users => {
        this.setState({
          usersLive: users
        });
      });

      socket.on("new comment", msg => {
        this.setState(state => ({
          commentsLive: [...state.commentsLive, msg]
        }));
      });

      this.setState({
        socket
      });
    }
  }

  componentWillUnmount() {
    const { socket } = this.state;
    socket.disconnect();
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
    const { comment, commentsLive, usersLive } = this.state;
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
          <StyledCard width="90%" margin="20px auto" title="Active users">
            {usersLive.map(u => (
              <div key={u._id}>
                {u.name}
                <img
                  src={`https://localhost:3001/user/avatar/${u._id}`}
                  alt="Avatar"
                  style={{
                    width: "20px",
                    height: "20px"
                  }}
                />
              </div>
            ))}
          </StyledCard>
          <StyledCard width="90%" margin="20px auto" title="Comments">
            {commentsLive.map(com => (
              <div key={com._id}>
                {com.content} by {com.author.name}
              </div>
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
