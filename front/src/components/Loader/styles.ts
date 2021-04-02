import styled from 'styled-components';

export const Container = styled.div`

	height: .2rem;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1000;
	animation: preloader 1.2s linear infinite;
    background-color: ${props => props.theme.color.unselected};
    border-radius: 50%;

    @keyframes preloader {
        0% {
            width: 10%;
            left: 0;
        }
        25% {
            width: 40%;
            left: 25%;
        }
        50% {
            width: 10%;
            left: 70%;
        }
        100% {
            width: 15%;
            left: 100%;
        }
    }
`;