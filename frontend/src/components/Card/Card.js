import React from 'react';
import styled from 'styled-components';

export const StyledCard = styled(Card)`
    background-color: white;
    padding: 20px;
    width: 60%;
    border: 1px solid rgb(238, 236, 238);
    margin: 30px auto;
    text-align: justify
`;

function Card ({className, children}) {
    return (
        <div className={className}>
            {children}
        </div>
    )
};