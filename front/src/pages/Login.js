import React from "react"
import { Redirect } from "react-router-dom"
import "../css/Login.css"
import userService from "../services/user.service"

class LoginPage extends React.Component {
    state = {
        loggedIn: false
    }
    signUp = async () => {
        //get all elements
        const firstName = document.getElementById('SUFN');
        const lastName = document.getElementById('SULN');
        const userName = document.getElementById('SUUN');
        const password = document.getElementById('SUPW');
        if (!firstName.value || !lastName.value || !userName.value || !password.value) return; //prevents clicking too early

        //clear invalid class from elements
        firstName.classList.remove('invalid_username')
        lastName.classList.remove('invalid_username')
        userName.classList.remove('invalid_username')
        password.classList.remove('invalid_username')

        //check all fields
        let issue = false
        if (firstName.value.length < 1 || firstName.value.length > 25 || firstName.value.replace(/[^a-z]/gi, '') !== firstName.value) { issue = true; firstName.classList.add('invalid_username') }
        if (lastName.value.length < 1 || lastName.value.length > 25 || lastName.value.replace(/[^a-z]/gi, '') !== lastName.value) { issue = true; lastName.classList.add('invalid_username') }
        if (userName.value.length < 1 || userName.value.length > 30 || userName.value.replace(/[^a-z0-9!@#$%^&*_-]/gi, '') !== userName.value) { issue = true; userName.classList.add('invalid_username') }
        if (password.value.length < 1 || password.value.length > 75 || password.value.replace(/[^a-z0-9!@#$%^&*_-]/gi, '') !== password.value) { issue = true; password.classList.add('invalid_username') }
        if (issue) return;

        //send to db
        let res = await userService.add(firstName.value, lastName.value, userName.value, password.value)

        //handle result
        if (res.errored) userName.classList.add('invalid_username')
        else {
            let container = document.getElementById('container');
            container.classList.remove("right-panel-active");
        }
    }
    logIn = async () => {
        //get all elements
        const userName = document.getElementById('LIUN');
        const password = document.getElementById('LIPW');
        if (!userName.value || !password.value) return; //prevents clicking too early

        //clear invalid class from elements
        userName.classList.remove('invalid_username')
        password.classList.remove('invalid_username')

        //check all fields
        let issue = false
        if (userName.value.length < 1 || userName.value.length > 30 || userName.value.replace(/[^a-z0-9!@#$%^&*_-]/gi, '') !== userName.value) { issue = true; userName.classList.add('invalid_username') }
        if (password.value.length < 1 || password.value.length > 75 || password.value.replace(/[^a-z0-9!@#$%^&*_-]/gi, '') !== password.value) { issue = true; password.classList.add('invalid_username') }
        if (issue) return;

        //send to db
        let res = await userService.login(userName.value, password.value)

        //handle result
        if (res.errored) password.classList.add('invalid_username')
        else {
            localStorage.setItem(`uid`, res);
            localStorage.setItem('username', userName.value);
            await sleep(200)
            this.setState({ loggedIn: true })
            return <Redirect to='/' />
        }
    }
    SUAnimation() {
        const container = document.getElementById('container');
        container.classList.add("right-panel-active");
    }
    SIAnimation() {
        const container = document.getElementById('container');
        container.classList.remove("right-panel-active");
    }
    render() {
        if (this.state.loggedIn) return <Redirect to='/' />

        return (
            <div className="container" id="container">
                <div className="form-container sign-in-container">
                    <div className='form'>
                        <h1>Sign in</h1>
                        <input type="text" placeholder="Username" id='LIUN' />
                        <input type="password" placeholder="Password" id='LIPW' />
                        <a href="/">Forgot your password?</a>
                        <button onClick={this.logIn}>Sign In</button>
                    </div>
                </div>
                <div className="form-container sign-up-container">
                    <div className='form'>
                        <h1>Create Account</h1>
                        <input type="text" placeholder="First Name" id='SUFN' />
                        <input type="text" placeholder="Last Name" id='SULN' />
                        <input type="text" placeholder="Username" id='SUUN' />
                        <input type="password" placeholder="Password" id='SUPW' />
                        <button onClick={this.signUp}>Sign Up</button>
                    </div>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To reconnect with your account. Please enter your login information</p>
                            <button className="ghost" id="signIn" onClick={this.SIAnimation}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Welcome!</h1>
                            <p>To sign up for Blue Bounty, Click below</p>
                            <button className="ghost" id="signUp" onClick={this.SUAnimation}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default LoginPage

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
} 