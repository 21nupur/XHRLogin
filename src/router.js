import React,{ Component } from 'react'
import { Route,BrowserRouter,Switch,Redirect } from 'react-router-dom'

import Login from './component/Login'
import Register from './component/Register'

export class Routerr extends Component{
    render(){
        return(
            <div>
                <Switch>
                    <Route exact path="/login" component={ Login }/>
                    <Route exact path="/register" component={ Register }/>
                    <Redirect  from='/*' to='/login' />
                </Switch>
            </div>
        );
    } 
}

export default Routerr;