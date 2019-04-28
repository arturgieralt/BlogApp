import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../formElements/Button";

function MenuList({ className, isAdmin, isAuthenticated, user, logout }) {
  return (
    <ul className={className}>
      <li>
        <Link to="/">arturgieralt.pl</Link>
      </li>
      <li>
        <Link to="/articles">Articles</Link>
      </li>
      {isAuthenticated && isAdmin && (
        <li>
          <Link to="/articles/add">Add article</Link>
        </li>
      )}
      {!isAuthenticated && (
        <React.Fragment>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </React.Fragment>
      )}
      {/* <li>
        <span>search...</span>
      </li> */}
      {isAuthenticated && (
        <React.Fragment>
          <li>Welcome {user.claims.name}</li>
          <li>
            <Button onClick={() => logout()}>Logout</Button>
          </li>
        </React.Fragment>
      )}
    </ul>
  );
}

export default styled(MenuList)`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: rgb(27, 45, 67);

  & li {
    float: left;
  }

  & li:last-of-type {
    float: right;
    padding: 10px 20px;
  }
  & li a {
    display: block;
    color: white;
    text-align: center;
    height: 47px;
    padding: 13px 20px;
    box-sizing: border-box;
    text-decoration: none;
  }

  & li a:hover:not(.active) {
    background-color: #ddd;
  }

  & li a.active {
    color: white;
    background-color: #4caf50;
  }

  & li span {
    width: 200px;
    display: inline-block;
    border: 1px solid grey;
    padding: 3px 5px;
    border-radius: 5px;
  }
`;
