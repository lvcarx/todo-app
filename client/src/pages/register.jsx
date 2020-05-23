import React from 'react';
import axios from 'axios'
class RegisterPage extends React.Component {

    constructor() {
        super()
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePassword2 = this.onChangePassword2.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.tryRegister = this.tryRegister.bind(this);

        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            loggedIn: false,
            registerProblems: []
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

    onChangePassword2(e) {
        this.setState({
            password2: e.target.value
        });
    }

    tryRegister(e) {
        e.preventDefault();
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }
        axios.post(`${process.env.REACT_APP_TEST}/api/users/register`, user)
            .then((resp) => {
                if (!resp.data.token) {
                    this.setState({
                        registerProblems: resp.data  
                    });
                    console.log(resp.data);
                } else {
                    console.log(resp.data)
                    localStorage.setItem("user-token", resp.data.token);
                    window.location.reload(false);
                }
            })

        this.setState({
            name: '',
            email: '',
            password: '',
            password2: ''
        })
        if (localStorage.getItem("user-token")) {
            window.location.reload(false);
        }
    }
    
    render() {
        return(
            <div className="register">
            <img src="/img/logo.svg" className="logo"></img>
            <div className="wrapper">  
              <h1 className="text-center mb-3">Register</h1>
              <p>A ToDo Manager that helps scheduling your day!</p>
              {this.state.registerProblems.length != 0 &&
                    this.state.registerProblems.map(registerProblem =>  
                            <div className="flashMessage">
                                {registerProblem.msg}
                            </div>
                    )
                }
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
                            required
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
                            required
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
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            placeholder="Confirm Password"
                            value={this.state.password2}
                            onChange={this.onChangePassword2}
                            required
                        />
                    </div>
                    <label><input type="checkbox" value="dsgvo" name="dsgvo" required></input>I agree to the <a target="_blank" href="https://luca-reichmann.de/datenschutzerklaerung/">Privacy Statement</a> of be productive. by registrating and using the app.
                    </label>
                    <button onClick={this.tryRegister} type="submit" className="btn btn-primary dark-btn btn-block">Register</button>
                </form>
                <p>Already have an account? <a href="/#/login">Login</a></p>
            </div>
            </div>
        );
    }
}



export default RegisterPage