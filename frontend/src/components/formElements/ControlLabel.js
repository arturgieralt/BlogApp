import React from 'react';

const ElementLabel = ({name, children}) => 
(
    <label>
        {name}
        {children}
    </label>
);

export default ElementLabel;