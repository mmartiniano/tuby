import styled, { css } from 'styled-components';

export const Container = styled.div`
    margin-top: 2rem;
`;

export const StyledButton = styled.button`
	width: 100%;
	height: 3rem;
    font-size: 1.2rem;
	font-family: inherit;
	outline: none;
	box-shadow: none !important;
	transition: border 0.2s;
    color: ${props => props.theme.color.secondary};
    background-color: transparent;
	border: .15rem solid ${props => props.theme.color.secondary};
	border-radius: ${props => props.theme.radius};
	font-weight: bold !important;
	transition: all 0.2s ease-in-out;

    &:active {
        opacity: 0.6;
    }

	&:hover {
		${props => !props.disabled && css`
			background-color: ${props => props.theme.color.secondary};
			color: ${props => props.theme.color.primary};
			cursor: pointer;
		`};
	}
`;