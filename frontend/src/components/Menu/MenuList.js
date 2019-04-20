import React from "react";
import styled from "styled-components";

function MenuList({ className }) {
  return (
    <ul className={className}>
      <li>
        <a href="/" id="mainLink">
          arturgieralt.pl
        </a>
      </li>
      <li>
        <a href="/" id="mainLink">
          Articles
        </a>
      </li>
      <li>
        <a href="/" id="mainLink">
          Main
        </a>
      </li>
      <li>
        <a href="/" id="mainLink">
          Main
        </a>
      </li>
      <li>
        <span>search...</span>
      </li>
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
