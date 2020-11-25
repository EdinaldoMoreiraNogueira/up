import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import RedirectPage from '../pages/RedirectPage';
import StatsPages from '../pages/StatsPages';
import NotFoundPage from '../pages/NotFoundPage';

function Routes() {
    return (
        <BrowserRouter>
        <Switch>
            <Route exact path="/" component = {HomePage} />
            <Route exact path="/:code" component = {RedirectPage} />
            <Route exact path="/:code/status" component= {StatsPages} />
            <Route exact path="/*" component= {NotFoundPage} />
        </Switch>
        </BrowserRouter>
    )
}

export default Routes;