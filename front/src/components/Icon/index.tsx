import React, { HTMLAttributes } from 'react';

import { MaterialIcon } from './styles';


interface Props extends HTMLAttributes<HTMLDivElement> {
    pointer?: boolean;
}

const Icon: React.FC<Props> = ({children, ...rest}) => (
    <MaterialIcon {...rest}>
        {children}
    </MaterialIcon>
);

export default Icon;