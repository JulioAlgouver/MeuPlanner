import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Route from '../Routes/Route';

import Login from '../Pages/Login';
import SignUp from '../Pages/SignUp';
import Dashboard from '../Pages/Dashboard';
import NotFound from '../Pages/PageNotFound';

const Routes: React.FC = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/Dashboard" exact component={Dashboard} isPrivate/>
            <Route path="/SignUp" exact component={SignUp}/>
            <Route path="*" component={NotFound}/>
        </Switch>    
    </BrowserRouter>

)

export default Routes;