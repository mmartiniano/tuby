import React, { ImgHTMLAttributes } from 'react';

import { Image } from './styles';


const Thumbnail: React.FC<ImgHTMLAttributes<HTMLImageElement>> = (props) => {
    return (
        <Image {...props} />
    );
}

export default Thumbnail;
