import React from 'react';

import { IStream } from '../../@types';
import { Container } from './styles';


const Stream: React.FC<IStream> = ({ resolution, size }) => {
    return (
        <Container>
            <span>{resolution}</span>
            <span>{Math.round(size / 1000000) + 'MB'}</span>
        </Container>
    );
}

export default Stream;