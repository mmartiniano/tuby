import React, { useContext, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { IMusic} from '../../@types';
import { ActionType, Context } from '../../context';
import { Content, Left, Right, VideoTitle, VideoAuthor } from './styles';
import Thumbnail from '../../components/Thumbnail';
import Card from '../../components/Card';
import Button, { ButtonProps } from '../../components/Button';
import YouTubeService from '../../services/YouTubeService';
import Error from '../../components/Error';


const DownloadButton: React.FC<ButtonProps> = props => (
    <Button
        style={{fontSize: '1rem', height: '2.5rem'}}
        loading_text="Downloading..." 
        {...props}
    />
)

const Video: React.FC<RouteComponentProps> = ({ history }) => {
    const context = useContext(Context);
    const video = (context?.state || {}).video;

    if (! video)
        history.push('/');

    const [msg, setMsg] = useState<string>();
    const [buttonLoading, setButtonLoading] = useState<number>();

    const displayLoader = (visible: boolean) => {
        context?.dispatch({ 
            type: ActionType.LOAD,
            payload: {
                ...context.state,
                loading: visible
            }
        })
    }

    const music = video!.music as IMusic;

    const byteToMega = (bytes: number = 0): string => {
        return Math.round(bytes / 1000000) + 'MB';
    }

    const handleClick = (resource: string, button: number) => {  
        setMsg('');
        setButtonLoading(button);
        displayLoader(true);

        YouTubeService.download(video!.link!, resource)
        .then( response => {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(response.data);
            link.download = response.headers['x-suggested-filename'];
            link.click();
        })
        .catch( () => {
            setMsg('Failed to download');
        }).then( () => {
            displayLoader(false);
            setButtonLoading(-1);
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
                    <DownloadButton
                        onClick={() => handleClick('v', 0)}
                        loading={buttonLoading === 0}
                    >
                        Download video ({byteToMega(video?.streams?.complete.size)})
                    </DownloadButton>
                </Card>
                {music.song && (
                    <Card>
                        <Card.Title> Music </Card.Title>
                        <p><strong>Song: </strong>{music.song}</p>
                        <p><strong>Artist: </strong>{music.artist || ''}</p>
                        <p><strong>Album: </strong>{music.album}</p>
                        <p><strong>Resolution: </strong>{video?.streams?.audio.resolution}</p>
                        <DownloadButton 
                            onClick={() => handleClick('m', 1)}
                            loading={buttonLoading === 1}
                        >
                            Download as music ({byteToMega(video?.streams?.audio.size)})
                        </DownloadButton>
                    </Card>
                )}
                <Card>
                    <Card.Title> Audio </Card.Title>
                    <p><strong>Resolution: </strong>{video?.streams?.audio.resolution}</p>
                    <DownloadButton
                        onClick={() => handleClick('a', 2)}
                        loading={buttonLoading === 2}
                    >
                        Download raw audio ({byteToMega(video?.streams?.audio.size)})
                    </DownloadButton>
                </Card>
            </Right>
            
        </Content>
    )
}

export default Video;