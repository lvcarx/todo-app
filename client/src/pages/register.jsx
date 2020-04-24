import React from 'react';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

    }

    
    render() {
        return(
            <div>
           
            <div className="wrapper register content">
                
                    <h1 className="text-center mb-3">Register</h1>
                    <h1>Login</h1>
              <form action="/users/login" method="post">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter Email"
                           
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
                           
                        />
                    </div>
                    <button type="submit" className="btn btn-primary dark-btn btn-block">Login</button>
                </form>
            </div>
            </div>
        );
    }
}



export default RegisterPage