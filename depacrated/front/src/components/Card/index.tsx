import React, { HTMLAttributes } from 'react';

import { Container, Header } from './styles';


interface SubComponents {
    Title: React.FC
}

const Card: React.FC<HTMLAttributes<HTMLDivElement>> & SubComponents = ({ children, ...rest }) => {
    return (
        <Container {...rest}>
            {children}
        </Container>
    );
}

const Title: React.FC<HTMLAttributes<HTMLParagraphElement>> = ({ children, ...rest }) => {
    return(
        <Header {...rest}>
            {children}
        </Header>
    );
}

Card.Title = Title;

export default Card;