import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    padding: 0;
`;

export const Label = styled.label`
    font-size: .9rem;
    padding-left: .2rem;
    font-weight: bold;
	color: ${props => props.theme.color.secondary};
`;

export const StyledInput = styled.input`
    height: 2rem;
    font-size: 1.2rem;
    text-indent: .2rem;
	font-family: inherit;
	outline: none;
	box-shadow: none;
    font-weight: bold;
    background-color: transparent;
	color: ${props => props.theme.color.secondary};
	transition: border .2s linear;
    min-width: 100%;
    border: none;
    border-bottom: .2rem solid ${props => props.theme.color.unselected};

    &:focus {
        border-bottom-color: ${props => props.theme.color.secondary};
    }

    /* Placeholder color */
    ::placeholder {
        color: ${props => props.theme.color.unselected};
        font-weight: bold;
        opacity: 1; /* Firefox */
    }
    
    :-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: ${props => props.theme.color.unselected};
        font-weight: bold;
    }

    ::-ms-input-placeholder { /* Microsoft Edge */
        color: ${props => props.theme.color.unselected};
        font-weight: bold;
    }

    /* Remove autofill yellow background */
    &:-webkit-autofill {
        transition: all 0s linear 5000s;
    }
`;