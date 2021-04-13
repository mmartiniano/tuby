import styled from 'styled-components';


export const Content = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;

    @media only screen and (min-width: 600px) {
        & {
            width: 60%;
        }
    }

    @media only screen and (min-width: 992px) {
        & {
            width: 100%;
        }
    }
`;

export const BackButton = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.1rem;
    margin-bottom: 1.2rem;
    cursor: pointer;
`;

export const VideoTitle = styled.h2`
    margin-top: 0.5rem;
    font-size: 1.2rem;
    font-weight: bold;
`;

export const VideoAuthor = styled.p`
    font-size: 1.1rem;
`;

export const Left = styled.div`
    margin-top: 1.2rem;

    @media only screen and (min-width: 992px) {
        & {
            width: 45%;
            position: fixed;
            height: calc(100vh - 3.5rem);
            left: 0;
            top: 3.5rem;
            margin-top: 0;
            display: flex;
            justify-content: center;
            flex-direction: column;
            padding: 0 5rem;
        }
    }
`;

export const Right = styled.div`
    @media only screen and (min-width: 992px) {
        & {
            width: 45%;
            padding: 2rem 5rem;
            margin-left: 50%;
        }
    }
`;