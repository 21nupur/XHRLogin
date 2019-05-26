import React,{ Component } from 'react'
import Logo from './icono_home.png'
import { Link, BrowserRouter, HashRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import { M } from 'materialize-css/dist/js/materialize';
import config from '../config.json';

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            showToast: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleClick(e){
        const {username, password} = this.state;
        fetch(config.api_base+'/api/v1/token/', {
            method: 'post',
            body:JSON.stringify({'username':username, 'password':password}),
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then(response=>{return response.json()})
        .then(response=>{
            // console.log(response.access)
            if(!response.access){
                this.setState({
                    showToast: false
                })
                alert('Login Failed');
                return;

            }
            Cookies.set('accessToken', response.access);
            Cookies.set('username', this.state.username);
            this.props.login();
        }).catch(err => {
            console.log(err);
        })
    }

    render(){
        const {showToast} = this.state;
        console.log(showToast)
        return(
            <HashRouter>
            <div>
                <div class="row">
                    <div class="col  m4 offset-m3" style={{marginTop:250}}>
                    <div class="card white z-depth-3" style={{height:400,width:900,borderRadius:10}}>
                    {/* <div><Link to='/home'><img src={Logo} style={{height:30,width:30,margin:10}} class="left"/></Link></div> */}
                        <div class="card-content black-text">
                        <span class="card-title" style={{fontFamily: 'Rancho',fontSize:50}}>User Login</span><br/>
                        <div class="input-field col l6 offset-l3">
                            <input id="used_id" type="text" class="validate" name="username" onChange={this.handleChange}/>
                            <label for="used_id" >User ID</label>
                            </div>
                            <div class="input-field col l6 offset-l3">
                            <input id="pass" type="password" class="validate" name="password" onChange={this.handleChange}/>
                            <label for="pass">Password</label><br/>
                            </div>
                            <div class="input-field col l6 offset-l3">
                            <button class="btn waves-effect red" type="submit" name="action" onClick={this.handleClick}>Submit</button>
                                <br/><br/>   New user?   <Link to="/register">Register</Link>
                            </div>
                       </div>
                    </div>
                    </div>
                </div>
                {showToast? <div> <a onClick={M.showToast({html: 'I am a toast'})} class="btn">Toast!</a></div>: null}
            </div>
            </HashRouter>

        );
    }
}

export default Login;