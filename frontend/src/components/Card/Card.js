import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

function Card({ className, children, title }) {
  return (
    <div className={className}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

const StyledCard = styled(Card)`
  background-color: white;
  padding: 20px;
  width: ${props => props.width};
  border: 1px solid rgb(238, 236, 238);
  margin: ${props => props.margin};
  text-align: justify;
  box-sizing: border-box;
  line-height: 2;
`;

export default StyledCard;

StyledCard.propTypes = {
  title: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  margin: PropTypes.string.isRequired
};
