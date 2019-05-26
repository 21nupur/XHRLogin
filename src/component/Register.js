import React,{ Component } from 'react'
import Logo from './icono_home.png'
import { Link , HashRouter, Redirect} from 'react-router-dom'
// import DatePicker from 'material-ui/DatePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import styled from 'styled-components';
// import { makeStyles } from 'material-ui/s'
// margin - top right bottom left
import {Container, DatePicker} from 'react-materialize';


class Register extends Component{

    constructor(props){
        super(props);
        this.state={
            
              user:  
              {first_name:'',
                last_name:'',
                username:'',
                email:'',
                password:'',
                phone:0,
                address:'',
                date_of_birth:''}
            
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e){
        var key = e.target.name
        var val = e.target.value 
        var user = this.state
        user[key] = val
        this.setState({user:user});
        
    }

    handleClick=e=>{
        e.preventDefault()
        var user = this.state;
        fetch('http://192.168.1.8:8000/api/v1/user/register',{
            method:'post',
            body:JSON.stringify(user),
            headers: {
                "Accept" : "application/json",
                "Content-Type" :"application/json"
            }
        }).then(response=>{
            debugger
            if(response.status==201){
                this.setState({
                    redirect: true
                })
                return response.json();
            }
            else{
                alert('failed')
            }
        }).then(data=>{
        }).catch(err=>{
            console.log(err)
        })

    }
    render(){
        const {redirect} = this.state;
        if(redirect){
            return <Redirect push to="/login" />
        }
         return(
                <HashRouter>
            <div>
                <div class="row">
                    <div class="col s12 m4 offset-m3" style={{marginTop:80}}>
                    <div class="card white z-depth-3"style={{height:650,width:900,borderRadius:10}}>
                    {/* <div><Link to='/home'><img src={Logo} style={{height:30,width:30,margin:10}} class="left"/></Link></div> */}
                        
                        <div class="card-content black-text"><br/>
                        <form onSubmit={this.handleClick}>
                        <span class="card-title" style={{fontFamily: 'Rancho',fontSize:50}}>Register yourself as a User</span><br/>
                            <div class="input-field col l5 offset-l1">
                            <input id="first_name" type="text" class="validate" name="first_name" onChange={this.handleChange}/>
                            <label for="first_name" >First Name</label>
                            
                            </div>
                            <div class="input-field col l5">
                            <input required id="last_name" type="text" class="validate" name="last_name" onChange={this.handleChange}/>
                            <label for="last_name" >Last Name</label>
                            </div>
                            
                            <div class="input-field col l5 offset-l1 ">
                            <input id="user_name" type="text" class="validate" name="username" onChange={this.handleChange}/>
                            <label for="user_name" >User Name</label>
                            </div>
                            <div class="input-field col l5 ">
                            <input id="email" type="email" class="validate" name="email" onChange={this.handleChange}/>
                            <label for="email" >Email </label>
                            </div>
                            
                            <div class="input-field col l5 offset-l1">
                            <input id="password" type="password" class="validate" name="password" onChange={this.handleChange}/>
                            <label for="password" >Password</label>
                            </div>
                            <div class="input-field col l5 ">
                            <input id="phone" type="number" class="validate" name="phone" onChange={this.handleChange}/>
                            <label for="phone" >Phone number</label>
                            </div>
                            <div class="input-field col l9 " style={{marginLeft:90}} >
                            <input id="address" type="text" class="validate" name="address" onChange={this.handleChange}/>
                            <label for="address" >Address </label>
                            </div>
                            <div class="input-field col l9 " style={{marginLeft:90}} >
                            <input id="address" type="date" class="validate" name="date_of_birth" onChange={this.handleChange}/>
                            <label for="address" >Date of Birth</label>
                            </div>   
                            
                            {/* <div class="input-field col">
                            <MuiThemeProvider >
                            <DatePicker hintText="Date of Birth" openToYearSelection={true} mode="landscape"/>
                            </MuiThemeProvider> 
                            </div> */}
                            <div class="input-field col l12 ">
                            <button class="btn waves-effect red" type="submit" name="action">Register</button>
                            <br/><br/>Already a user? <Link to="/login">Login</Link>
                       </div>
                       </form>
                    </div>
                   
                    </div>
                    
                </div>
                </div>
            </div>     
            </HashRouter>
        
        );
    }
}

export default Register;