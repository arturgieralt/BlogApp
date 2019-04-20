import styled from "styled-components";

const Input = styled.input`
  background-color: #1b2d43;
  font-size: 1em;
  margin-top: 1em;
  box-sizing: border-box;
  color: #fff;
  padding: 0.25em 1em;
  border: 1px solid #1b2d43;
  border-radius: 3px;
  display: block;
  width: 100%;

  :hover {
    opacity: 0.8;
  }

  :focus {
    opacity: 1;
  }
`;

export default Input;
