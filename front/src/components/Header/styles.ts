import styled from 'styled-components';

export const Container = styled.div`
    position: sticky;
    top: 0;
    z-index: 1;
    box-shadow: ${props => props.theme.shadow};
    height: 3.5rem;
    width: 100%;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;