import React from 'react';
import styled from 'styled-components';

export const StyledBar = styled(Bar)`
    width: 100%;
    height: 47px;
    color: white;
`;

function Bar ({className, children}) {
    return (
        <div className={className}>
        {children}  
        </div>
    );
}