import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Video from './pages/Video';
import NotFound from './pages/NotFound';

const Router: React.FC = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/video" component={Video}/>
            <Route component={NotFound}/>
        </Switch>
    </BrowserRouter>
);

export default Router;