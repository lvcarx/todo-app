import React from 'react';

class LoginPage extends React.Component {

    constructor() {
        super()
    }

    render() {
        return(
          <div>
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
        )
    }

}

export default LoginPage