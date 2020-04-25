import React from 'react';
import NotesPage from './pages/notes.jsx'
import LoginPage from './pages/login.jsx'
import RegisterPage from './pages/register.jsx'
import axios from 'axios'

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
      userIsAuthenticated: false
    }
  }

  componentWillMount() {
    const token = localStorage.getItem('user-token')
    if (token) {
      this.setState({userIsAuthenticated: true});
      console.log('Okay this worked!');
      axios.defaults.headers.common['x-auth-token'] = token
    }
  }
  
  render() {
    if (this.state.userIsAuthenticated) {
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
    } else {
      return (
        <HashRouter>
          <Switch>
            <Route exact path="/">
            <Redirect to='/login'/>
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/register">
              <LoginPage />
            </Route>
          </Switch>
        </HashRouter>
      );
    }
  }
}

export default App;
