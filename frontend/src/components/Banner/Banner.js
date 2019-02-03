import React from 'react';
import background from './background.jpg';
import styled from 'styled-components';

export const StyledBanner = styled(Banner)`
    width: 100%;
    height: 280px;
    background-image: url(${background});
    background-position: center bottom;
    background-size:cover;
    position: relative;
    & h4 {
        position: absolute;
        bottom: 3px;
        margin: 0 auto;
        color: white;
        font-size: 36px;
        letter-spacing: 2px;
        left:0;
        right:0;
        text-align: center;
    }
`;

function Banner ({className}) {
    return (
        <div className={className}>
            <h4>the art of the web</h4>
        </div>
    )
};