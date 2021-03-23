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
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLink(event.target.value);
    }

    const displayLoader = (visible: boolean) => {
        context?.dispatch({ 
            type: ActionType.LOAD,
            payload: {
                ...context.state,
                loading: visible
            }
        })
    }

    const handleSubmit = () => {
        if (! link) {
            setMsg('Please type a YouTube video link');
            return;
        }

        setLoading(true);
        displayLoader(true);
            
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
        .then( () => {
            displayLoader(false);
        })
    }

    return (
        <Content>
            {msg && (
                <Error>{msg}</Error>
            )}

            <Input name="link" autoFocus onChange={handleChange} value='' placeholder="Insert a YouTube video link"/>

            <Button onClick={handleSubmit} loading={loading} loading_text="Searching...">Search</Button>
        </Content>
    )
}

export default Home;