import {useEffect} from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import axios from 'axios';

import {HomePage, LoginPage, RegistrationPage, UsersPage, TasksPage} from "../pages";
import "./App.scss";

const App = () => {
  
  return (
    <div className="app">

      <Router>

      <Route exact path="/">
          <HomePage />
        </Route>

        <Route path="/login">
          <LoginPage />
        </Route>

        <Route path="/registration">
          <RegistrationPage />
        </Route>

        <Route path="/users">
          <UsersPage />
        </Route>

        <Route path="/tasks">
          <TasksPage />
        </Route>
      
      </Router>

    </div>
  );
}

export default App;