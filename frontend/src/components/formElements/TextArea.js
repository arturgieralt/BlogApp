import styled from 'styled-components';

const TextArea = styled.textarea`
  background-color: #1b2d43;
  font-size: 1em;
  margin-top: 1em;
  color: #fff;
  padding: 0.25em 1em;
  border: 1px solid #1b2d43;
  border-radius: 3px;
  min-height: 130px;
  width: 100%;
  display: block;
  box-sizing: border-box;

  :hover {
    opacity: 0.8;
  }

  :focus {
    opacity: 1;
  }
`;

export default TextArea;
