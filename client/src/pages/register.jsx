import React from 'react';
import axios from 'axios'
class RegisterPage extends React.Component {

    constructor() {
        super()
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.tryLogin = this.tryLogin.bind(this);

        this.state = {
            name: '',
            email: '',
            password: '',
            loggedIn: false
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
       });
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
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/api/users/register', user)
            .then((resp) => {
                if (resp.data) {
                    localStorage.setItem("user-token", resp.data);
                }
            })

        this.setState({
            name: '',
            email: '',
            password: ''
        })
        window.location.reload(false);
    }
    
    render() {
        return(
            <div className="register">
            <img src="/img/logo.svg" className="logo"></img>
            <div className="wrapper">  
              <h1 className="text-center mb-3">Register</h1>
              <p>A ToDo Manager that helps scheduling your day!</p>
              <form>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter Email"
                            value={this.state.name}
                            onChange={this.onChangeName}
                        />
                    </div>
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
                    <button onClick={this.tryLogin} type="submit" className="btn btn-primary dark-btn btn-block">Login</button>
                </form>
                <p>Already have an account? <a href="/#/login">Login</a></p>
            </div>
            </div>
        );
    }
}



export default RegisterPage