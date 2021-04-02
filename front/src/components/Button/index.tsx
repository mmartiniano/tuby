import React, { ButtonHTMLAttributes } from 'react';

import { Container, StyledButton } from './styles';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean
    loading_text?: string
}

const Button: React.FC<ButtonProps> = ({ children, loading, loading_text, ...rest }) => (

    <Container>
        <StyledButton {...rest} disabled={loading}>
            { loading ? loading_text : children }
        </StyledButton>
    </Container>
    
)

export default Button;