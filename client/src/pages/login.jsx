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
            loggedIn: false
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
        axios.post('/api/users/login', user)
            .then((resp) => {
                if (resp.data) {
                    localStorage.setItem("user-token", resp.data);
                }
            })

        this.setState({
            email: '',
            password: ''
        })
        if (localStorage.getItem("user-token") == true) {
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