import React, { HTMLAttributes } from 'react';

import { Container } from './styles';


const StreamList: React.FC<HTMLAttributes<HTMLUListElement>> = ({ children, ...rest }) => {
    return (
        <Container {...rest}>
            {children}
        </Container>
    );
}

export default StreamList;