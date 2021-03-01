import styled from 'styled-components';


export const Content = styled.div`
    width: 90%;
    display: flex;
    justify-content: center;
    flex-direction: column;

    @media only screen and (min-width: 768px) {
        & {
            width: 40%;
        }
    }

    @media only screen and (min-width: 992px) {
        & {
            width: 35%;
        }
    }
`;