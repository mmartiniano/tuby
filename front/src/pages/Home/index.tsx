import React, { useState, ChangeEvent, useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { IVideo } from '../../@types';
import { Context, ActionType } from '../../context';
import YouTubeService from '../../services/YouTubeService';
import { Content } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Error from '../../components/Error';


const Home: React.FC<RouteComponentProps> = ({ history }) => {
    const context = useContext(Context);

    const [msg, setMsg] = useState<string>();
    const [link, setLink] = useState<string>('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLink(event.target.value);
    }

    const handleSubmit = () => {
        if (! link)
            return
            
        YouTubeService.search(link)
        .then( response => {
            if (context) {
                context.dispatch({
                    type: ActionType.WRITE,
                    payload: {
                        ...context.state,
                        video: response as IVideo
                    }
                })
                history.push('/video');
            }
        })
        .catch( error => {
            setMsg(error.response ? error.response.data : 'Failed to connect');
        })
    }

    return (
        <Content>
            {msg && (
                <Error>{msg}</Error>
            )}

            <Input name="link" autoFocus onChange={handleChange} value='' placeholder="Insert a YouTube video link"/>

            <Button onClick={handleSubmit}>Search</Button>
        </Content>
    )
}

export default Home;