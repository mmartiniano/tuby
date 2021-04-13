import styled from 'styled-components';


export const Container = styled.div`
    width: 100%;
    box-shadow: ${props => props.theme.shadow};
    padding: 2rem;
    font-size: .9rem;

    & + & {
        margin-top: 1.5rem;
    }
`;

export const Header = styled.p`
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    display: flex;
`;