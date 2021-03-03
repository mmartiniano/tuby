import React, { useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { IMusic} from '../../@types';
import { Context } from '../../context';
import { Content, Left, Right, VideoTitle, VideoAuthor } from './styles';
import Thumbnail from '../../components/Thumbnail';
import Card from '../../components/Card';
import Button from '../../components/Button';
import StreamList from '../../components/StreamList';
import Stream from '../../components/Stream';


const Video: React.FC<RouteComponentProps> = ({ history }) => {
    const context = useContext(Context);
    const video = (context?.state || {}).video;

    if (! video)
        history.push('/');

    // const [msg, setMsg] = useState<string>();

    const music = video!.music as IMusic

    const listStreams = video!.streams!.all.map(stream => (
        <Stream {...stream} />
    ));

    return (
        <Content>
            {/* {msg && (
                <Error>{msg}</Error>
            )} */}
            <Left>
                <Thumbnail alt="thumbnail" title="thumbnail" src={video!.thumbnail} />
                <VideoTitle> {video!.title} </VideoTitle>
                <VideoAuthor> {video!.author} </VideoAuthor>
            </Left>
            <Right>
                <Card>
                    <Card.Title> Video </Card.Title>
                    <p><strong>Duration: </strong>{video?.length}</p>
                    <p><strong>Views: </strong>{video?.views || ''}</p>
                    <Button> Download video in best quality </Button>
                </Card>
                {music.song && (
                    <Card>
                        <Card.Title> Music </Card.Title>
                        <p><strong>Song: </strong>{music.song}</p>
                        <p><strong>Artist: </strong>{music.artist || ''}</p>
                        <Button> Download as music </Button>
                    </Card>
                )}
                <Card>
                    <Card.Title> Audio </Card.Title>
                    <Button> Download raw audio </Button>
                </Card>
                <Card>
                    <Card.Title> All Files </Card.Title>
                    <StreamList>
                        {listStreams}
                    </StreamList>
                </Card>
            </Right>
            
        </Content>
    )
}

export default Video;