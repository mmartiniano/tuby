import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Video from './pages/Video';

const Router: React.FC = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/video" component={Video}/>
        </Switch>
    </BrowserRouter>
);

export default Router;