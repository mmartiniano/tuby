import React, { ButtonHTMLAttributes } from 'react';

import { Container, StyledButton } from './styles';


const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...rest }) => (

    <Container>
        <StyledButton {...rest}>
            {children}
        </StyledButton>
    </Container>
    
)

export default Button;