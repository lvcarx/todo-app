import React from 'react';
import NotesPage from './pages/todo.jsx'
import LoginPage from './pages/login.jsx'
import RegisterPage from './pages/register.jsx'
import axios from 'axios'

import style from './css/style.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import { HashRouter } from 'react-router-dom';


class App extends React.Component {
  
  constructor() {
    super()
    this.state = {
      userIsAuthenticated: false,
      isUserValid: false
    }
  }

  componentWillMount() {
    let token = localStorage.getItem('user-token')
    let user = {
      token: token
    }
    axios.post(`${process.env.REACT_APP_TEST}/api/users/auth`, user)
            .then((resp) => {
                console.log(resp.data);
                if (resp.data == "valid") {
                    this.setState({
                        isUserValid: true
                    });
                } else if (resp.data == "not-valid") {
                  this.setState({
                    userIsAuthenticated: false,
                    isUserValid: false
                  });
                }
            }) 

    if (token) {
      this.setState({
        userIsAuthenticated: true
      });
      axios.defaults.headers.common['x-auth-token'] = token
    }
  }
  
  render() {
    if (this.state.userIsAuthenticated == true && this.state.isUserValid == true) {
      return (
        <HashRouter>
          <Switch>
            <Route exact path="/">
              <NotesPage />
            </Route>
            <Route path="/login">
              <Redirect to='/' />
            </Route>
            <Route exact path="/register">
              <Redirect to='/' />
            </Route>
          </Switch>
        </HashRouter>
      );
    } else if (this.state.userIsAuthenticated == false && this.state.isUserValid == false) {
      return (
        <HashRouter>
          <Switch>
            <Route exact path="/">
              <Redirect to='/login' />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/register">
              <RegisterPage />
            </Route>
          </Switch>
        </HashRouter>
      );
    } else if (this.state.userIsAuthenticated == true && this.state.isUserValid == false) {
      return (
        <HashRouter>
          <Switch>
          <Route exact path="/">     
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/register">
              <RegisterPage />
            </Route>
          </Switch>
        </HashRouter>
      );
    }
  }
}

export default App;
