import React, { useContext, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { IMusic} from '../../@types';
import { Context } from '../../context';
import { Content, Left, Right, VideoTitle, VideoAuthor } from './styles';
import Thumbnail from '../../components/Thumbnail';
import Card from '../../components/Card';
import Button from '../../components/Button';
import YouTubeService from '../../services/YouTubeService';
import Error from '../../components/Error';

const Video: React.FC<RouteComponentProps> = ({ history }) => {
    const context = useContext(Context);
    const video = (context?.state || {}).video;

    if (! video)
        history.push('/');

    const [msg, setMsg] = useState<string>();

    const music = video!.music as IMusic;

    const byteToMega = (bytes: number): string => {
        return Math.round(bytes / 1000000) + 'MB';
    }

    const handleClick = (resource: string) => {           
        YouTubeService.download(video!.link!, resource)
        .then( response => {
            setMsg('');

            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(response.data);
            link.download = response.headers['x-suggested-filename'];
            link.click();
        })
        .catch( () => {
            setMsg('Failed to download');
        })
    }

    return (
        <Content>
            {msg && (
                <Error>{msg}</Error>
            )}
            <Left>
                <Thumbnail alt="thumbnail" title="thumbnail" src={video!.thumbnail} />
                <VideoTitle> {video!.title} </VideoTitle>
                <VideoAuthor> {video!.author} </VideoAuthor>
            </Left>
            <Right>
                <Card>
                    <Card.Title> Video </Card.Title>
                    <p><strong>Resolution: </strong>{video?.streams?.complete.resolution}</p>
                    <Button style={{fontSize: '1.1rem'}} onClick={() => handleClick('v')}>
                        Download video ({byteToMega(video!.streams!.complete.size)})
                    </Button>
                </Card>
                {music.song && (
                    <Card>
                        <Card.Title> Music </Card.Title>
                        <p><strong>Song: </strong>{music.song}</p>
                        <p><strong>Artist: </strong>{music.artist || ''}</p>
                        <p><strong>Album: </strong>{music.album}</p>
                        <p><strong>Resolution: </strong>{video?.streams?.audio.resolution}</p>
                        <Button style={{fontSize: '1.1rem'}} onClick={() => handleClick('m')}>
                            Download as music ({byteToMega(video!.streams!.audio.size)})
                        </Button>
                    </Card>
                )}
                <Card>
                    <Card.Title> Audio </Card.Title>
                    <p><strong>Resolution: </strong>{video?.streams?.audio.resolution}</p>
                    <Button style={{fontSize: '1.1rem'}} onClick={() => handleClick('a')}>
                        Download raw audio ({byteToMega(video!.streams!.audio.size)})
                    </Button>
                </Card>
            </Right>
            
        </Content>
    )
}

export default Video;