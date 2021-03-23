import React, { useContext } from 'react';

import { Context } from '../../context';
import { Container } from './styles';

const Loader: React.FC = () => {
    const context = useContext(Context);
    const visible = (context?.state || {}).loading;
    
    return (
        <>
            {visible && (
                <Container/>
            )}
        </>
    )
}

export default Loader;