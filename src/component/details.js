import React,{ Component } from 'react'
import Analysis from './ana.jpg'
import Exit from './exit.png'
import Cookies from 'js-cookie';
import Moment from 'react-moment';
import { Route,Link,Switch, HashRouter,Redirect } from 'react-router-dom'

// fetch('http://192.168.1.8:8000/api/v1/user/register',{
//             method:'post',
//             body:JSON.stringify(user),
//             headers: {
//                 "Accept" : "application/json",
//                 "Content-Type" :"application/json"
//             }
//         }).then(response=>{
//             debugger
//             if(response.status==201){
//                 this.setState({
//                     redirect: true
//                 })
//                 return response.json();



class Details extends Component{
    constructor(props){
        super(props);
            this.state = {
                user:{}
        }
    }

    componentDidMount(){
        var that = this;
        fetch('http://192.168.1.8:8000/api/v1/user/details',{
                method:'get',
                headers:{
                    "Accept":"application/json",
                    "Content-type":"application/json",
                    "Authorization" : "Bearer "+Cookies.get('accessToken')
                } 
            })
            .then( function(response){
                return response.json()
            })
            .then(function(data){
                that.setState({
                    user:data.results[0]
                });
            })
    }
    render(){
        var {user}  = this.state
        console.log(user)
        return(
          <HashRouter>
            <div>
            <div class="row">
                <div class="col  m4 offset-m3" style={{marginTop:250}}>
                <div class="card white z-depth-3" style={{height:600,width:900,borderRadius:10}}>
                {/* <div><Link to='/home'><img src={Logo} style={{height:30,width:30,margin:10}} class="left"/></Link></div> */}
                    <div class="card-content black-text">
                       <a onClick={this.props.logout}><img src={Exit} style={{height:60}} class="right" /></a><br/><br/>
                    <span class="card-title" style={{fontFamily: 'Rancho',fontSize:50}}>User Details</span><br/>
                    <div class="left">
                    <p  style={{fontFamily: 'Rancho',fontSize:30,textAlign:"justify"}}>Name : {user.first_name+ ' '+ user.last_name}</p> <br/>
                    <p  style={{fontFamily: 'Rancho',fontSize:30,textAlign:"justify"}}>Date of Birth : {user.date_of_birth}</p><br/>
                    <p style={{fontFamily: 'Rancho',fontSize:30,textAlign:"justify"}}>Phone No. : {user.phone}</p><br/>
                    <p style={{fontFamily: 'Rancho',fontSize:30,textAlign:"justify"}}>Email :  {user.email}</p><br/>
                    <p style={{fontFamily: 'Rancho',fontSize:30,textAlign:"justify"}}>Address : {user.address}</p><br/>
                    <p style={{fontFamily: 'Rancho',fontSize:30,textAlign:"justify"}}>Date Joined : {user.date_joined}</p><br/>
                    <p style={{fontFamily: 'Rancho',fontSize:30,textAlign:"justify"}}>Last Login : {user.last_login}</p><br/>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            </HashRouter>
        );

    }
}

export default Details;