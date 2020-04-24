import React from 'react';
import NotesPage from './pages/notes.jsx'
import LoginPage from './pages/login.jsx'
import RegisterPage from './pages/register.jsx'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { HashRouter } from 'react-router-dom';


function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/">
          <NotesPage />
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



export default App;
