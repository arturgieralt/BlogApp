import React from "react";
import styled from "styled-components";

function Bar({ className, children }) {
  return <div className={className}>{children}</div>;
}

export default styled(Bar)`
  width: 100%;
  height: 47px;
  color: white;
`;
