import React, { useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Context } from '../../context';
// import YouTubeService from '../../services/YouTubeService';
import { Content } from './styles';
import Button from '../../components/Button';
// import Error from '../../components/Error';


const Video: React.FC<RouteComponentProps> = ({ history }) => {
    const context = useContext(Context);
    const video = (context?.state || {}).video;

    // if (! context.video)
    //     history.push('/');

    // const [msg, setMsg] = useState<string>();

    return (
        <Content>
            {/* {msg && (
                <Error>{msg}</Error>
            )} */}
            {JSON.stringify(video)}
            <Button>Download</Button>
        </Content>
    )
}

export default Video;