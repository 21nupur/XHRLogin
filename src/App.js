import React,{ Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './component/Login'
import { Route,BrowserRouter,Switch, HashRouter,Redirect } from 'react-router-dom'
import Register from './component/Register'
import Details from './component/details'
// import { Home } from './component/home';
import Cookies from 'js-cookie';

class App extends Component {

  constructor(props){
    super();
    this.state = {
      accessToken: undefined
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin=()=>{
    const accessToken = Cookies.get('accessToken');
    this.setState({
      accessToken: accessToken
    })
  }

  handleLogout=()=>{
    Cookies.remove('accessToken');
    this.setState({
      accessToken: undefined
    })
  }

  render(){
    if(!this.state.accessToken){
      return (
        <div style={{backgroundImage:'url(' + './plantss.jpg' + ')'}}className="App">
                <HashRouter>
                  <Switch>
                    <Route exact path="/login" render={(props)=>(<Login {...props} login={this.handleLogin}/>)}/>
                    <Route exact path="/register" component={ Register }/>
                    <Redirect  from='/*' to='/login' />
                  </Switch>
                </HashRouter>       
        </div>
      );
    }

    else{
      return(
        <Details logout={this.handleLogout}/>
      )
    }
    
  }
 
}

export default App;
