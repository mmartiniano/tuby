import styled from 'styled-components';


export const Container = styled.li`
    display: flex;
    justify-content: space-between;

    & + & {
        border-top: .15rem solid ${props => props.theme.color.secondary};
    }
`;