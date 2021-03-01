import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import Switch from 'react-switch';

import { Container } from './styles';


interface  Props {
    toggleTheme(): void;
}

const Header: React.FC<Props> = ({ toggleTheme }) => {
    const { title, color, shadow } = useContext(ThemeContext)
    return (
        <Container>
            <h1>Tuby</h1>

            <Switch
                onChange={toggleTheme}
                checked={title === 'dark'}
                offColor={color.unselected}
                onColor={color.unselected}
                onHandleColor="#235789"
                offHandleColor="#F1D302"
                activeBoxShadow={shadow}
                checkedIcon={false}
                uncheckedIcon={false}
                height={20}
                handleDiameter={25}
                width={35}
            />
        </Container>
    );
}

export default Header;