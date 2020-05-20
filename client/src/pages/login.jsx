import React from 'react';
import axios from 'axios'

class LoginPage extends React.Component {

    constructor() {
        super()
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.tryLogin = this.tryLogin.bind(this);

        this.state = {
            email: '',
            password: '',
            loggedIn: false,
            loginProblems: ''
        }
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
       });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    tryLogin(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post(`${process.env.REACT_APP_TEST}/api/users/login`, user)
            .then((resp) => {
                if (resp.data == "email-not-registered") {
                    console.log("not registered!");
                    this.setState({
                        loginProblems: resp.data
                    });
                } else if(resp.data == "password-incorrect") {
                    console.log("wrong pw!");
                    this.setState({
                        loginProblems: resp.data
                    });
                } else {
                    localStorage.setItem("user-token", resp.data.token);
                    window.location.reload(false);
                }
            })

        this.setState({
            email: '',
            password: ''
        })
        if (localStorage.getItem("user-token")) {
            window.location.reload(false);
        }
    }

    render() {
            return (
                <div className="login">
                    <img className="logo" src="/img/logo.svg"></img>
                    <div>
                        <h1>Login</h1>
                        <p>A ToDo Manager that helps scheduling your day!</p>

                        {this.state.loginProblems == "email-not-registered" &&
                            <div className="flashMessage">
                                This E-Mail is not registered or your password is incorrect!
                            </div>
                        }

                        {this.state.loginProblems == "password-incorrect" &&
                            <div className="flashMessage">
                                This E-Mail is not registered or your password is incorrect!
                            </div>
                        }
    
                        <form>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter Email"
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Enter Password"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                />
                            </div>
                            <p onClick={this.tryLogin} className="btn btn-primary dark-btn btn-block">Login</p>
                        </form>
                    </div>
                    <p>No account? <a href="/#/register">Register</a></p>
                </div>
            )
         
    }

}

export default LoginPage