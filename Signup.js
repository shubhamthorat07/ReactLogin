import React from "react";
import reactDOM from "react-dom";
import axios from "axios";

import  Transition  from 'react-transition-group'; 
import FadeTransition from "./fadeTransition";



import './LoginStyle.css';



class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoginOpen: true,
      isRegisterOpen: false
     
    };

    
  }



   showLoginBox() {
    this.setState({isLoginOpen: true, isRegisterOpen: false});
  }

  showRegisterBox() {
    this.setState({isRegisterOpen: true, isLoginOpen: false});
  } 

  render() {

    return (
      <div className="root-container">

        <div className="box-controller">
          <div
            className={"controller " + (this.state.isLoginOpen
            ? "selected-controller"
            : "")}
            onClick={this
            .showLoginBox
            .bind(this)}>
            LOGIN
          </div>
          <div
            className={"controller " + (this.state.isRegisterOpen
            ? "selected-controller"
            : "")}
            onClick={this
            .showRegisterBox
            .bind(this)}>
            REGISTER
          </div>
        </div>
 
        
        
        <FadeTransition isOpen={this.state.isLoginOpen} duration={500}>
          <div className="box-container">
            <LoginBox/>
          </div>
        </FadeTransition>
        <FadeTransition isOpen={this.state.isRegisterOpen} duration={500}>
          <div className="box-container">
            <RegisterBox/>
          </div>
        </FadeTransition>
        
      

      </div>
    );

  }

}

class LoginBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  submitLogin(e) {

    
  }

  render() {

    

    return (
      <div className="inner-container">
        <div className="header">
        <h2> Login </h2>
        </div>
        <div className="box">

          <div className="input-group">
            <label htmlFor="username">  Username </label>
            <input
              type="text"
              name="username"
              className="login-input"
              placeholder="Username"
             />

            
          </div>

          <div className="input-group">
            <label htmlFor="password">  Password </label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"
              />
          </div>

          <button
            type="button"
            className="login-btn"
            onClick={this
            .submitLogin
            .bind(this)}> Login </button>

        </div>
      </div>
    );
  }

}



function pop(props) {
  return
}



class RegisterBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      errors: [],
      pwdState: null
    };
  }



  showValidationErr(elm, msg) {
    this.setState((prevState) => ({
      errors: [
        ...prevState.errors, {
          elm,
          msg
        }
      ]
    }));
  }



  clearValidationErr(elm) {
    this.setState((prevState) => {
      let newArr = [];
      for (let err of prevState.errors) {
        if (elm !== err.elm) {
          newArr.push(err);
        }
      }
      return {errors: newArr};
    });
  }



  onUsernameChange(e) {
    this.setState({username: e.target.value});
    this.clearValidationErr("username");
  }

  onEmailChange(e) {
    this.setState({email: e.target.value});
    this.clearValidationErr("email");
   
  }

  onPasswordChange(e) {
    this.setState({password: e.target.value});
    this.clearValidationErr("password");

    this.setState({pwdState: "weak"});
    if (e.target.value.length > 8) {
      this.setState({pwdState: "medium"});
    } else if (e.target.value.length > 12) {
      this.setState({pwdState: "strong"});
    }

  }

 

  openPopup(e) {
    console.log("Hello world!");
  }

  submitRegister(e) {

    console.log(this.state);

    if (this.state.username == "") {
      this.showValidationErr("username", "Username Cannot be empty!");
    }
    if (this.state.email == "") {
      this.showValidationErr("email", "Email Cannot be empty!");
    }
    if (this.state.password == "") {
      this.showValidationErr("password", "Password Cannot be empty!");
    }

  }

  
  changeHandler = (e) =>{
      
    this.setState({[e.target.name]: e.target.value})
    
  }

  submitHandler = (e) =>{

    e.preventDefault()
    console.log(this.state)
    axios.post('https://jsonplaceholder.typicode.com/posts', this.state)
      .then(response =>{
        console.log(response)
      })
      .catch(error =>{
        console.log(error)
      })
  }

  render() {

    const{ username, email, password } = this.state

    let usernameErr = null,
      passwordErr = null,
      emailErr = null;

    for (let err of this.state.errors) {
      if (err.elm == "username") {
        usernameErr = err.msg;
      }
      if (err.elm == "password") {
        passwordErr = err.msg;
      }
      if (err.elm == "email") {
        emailErr = err.msg;
      }
    }

    let pwdWeak = false,
      pwdMedium = false,
      pwdStrong = false;

    if (this.state.pwdState == "weak") {
      pwdWeak = true;
    } else if (this.state.pwdState == "medium") {
      pwdWeak = true;
      pwdMedium = true;
    } else if (this.state.pwdState == "strong") {
      pwdWeak = true;
      pwdMedium = true;
      pwdStrong = true;
    }

    return (
      <div className="inner-container">
        <form onSubmit={this.submitHandler}>
        <div className="header">
         <h2> Register </h2>
        </div>
        <div className="box">

          <div className="input-group1">
            <label htmlFor="username"> Username </label>
            <input
              type="text"
              name="username"
              className="login-input"
              placeholder="Username"
              onChange={this
              .changeHandler
              }/>
            <small className="danger-error">{usernameErr
                ? usernameErr
                : ""}</small>
          </div>

          <div className="input-group1">
            <label htmlFor="email"> Email </label>
            <input
              type="text"
              name="email"
              className="login-input"
              placeholder="Email"
              onChange={this
              .changeHandler
              }/>
            <small className="danger-error">{emailErr
                ? emailErr
                : ""}</small>
          </div>

          <div className="input-group1">
            <label htmlFor="password"> Password </label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"
              onChange={this
              .changeHandler
              }/>
            <small className="danger-error">{passwordErr
                ? passwordErr
                : ""}</small>

            {this.state.password && <div className="password-state">
              <div
                className={"pwd pwd-weak " + (pwdWeak
                ? "show"
                : "")}></div>
              <div
                className={"pwd pwd-medium " + (pwdMedium
                ? "show"
                : "")}></div>
              <div
                className={"pwd pwd-strong " + (pwdStrong
                ? "show"
                : "")}></div>
            </div>}

          </div>

          <button
            type="button"
            className="login-btn"
            onHover={this
            .openPopup
            .bind(this)}
            onClick={this
            .submitHandler
            .bind(this)}>Register</button>
          

        </div>
        </form>
      </div>

    );

  }

  
  

}



reactDOM.render(
  <Signup/>, document.getElementById("root"));

  export default Signup;
