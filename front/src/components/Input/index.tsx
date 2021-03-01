import React, { InputHTMLAttributes, useState, ChangeEvent } from 'react';

import { Container, Label, StyledInput } from './styles';


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    placeholder?: string;
}

const Input: React.FC<InputProps> = ({ label, placeholder, name, value, onChange, ...rest }) => {

    const [state, setState] = useState<string | number | readonly string[] | undefined>(value);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setState(event.target.value);

        if (onChange)
            onChange(event)
    }

    return (
        <Container>
            {label && (
                <Label htmlFor="name">{label}</Label>
            )}
            <StyledInput
                {...rest}
                id={name || ''}
                name={name || ''}
                placeholder={placeholder || ''}
                value={state}
                onChange={handleChange}
                />
        </Container>
    )
}

export default Input;