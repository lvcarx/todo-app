import React from 'react';
import axios from 'axios'
class RegisterPage extends React.Component {

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
        axios.post('http://localhost:8000/api/users/register', user)
            .then((resp) => {
                if (resp.data) {
                    localStorage.setItem("user-token", resp.data);
                }
            })

        this.setState({
            email: '',
            password: ''
        })
    }
    
    render() {
        return(
            <div>
           
            <div className="wrapper register content">
                
                    <h1 className="text-center mb-3">Register</h1>
                    <h1>Login</h1>
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
                    <button onClick={this.tryLogin} type="submit" className="btn btn-primary dark-btn btn-block">Login</button>
                </form>
            </div>
            </div>
        );
    }
}



export default RegisterPage