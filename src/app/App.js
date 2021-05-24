import {useEffect} from 'react';
import {
  BrowserRouter as Router,
  Route,
  useHistory,
} from "react-router-dom";
import axios from 'axios';

import {LoginPage, RegistrationPage, UsersPage, TasksPage} from "../pages";
import "./App.scss";

const App = () => {

  const history = useHistory();
  
  return (
    <div className="app">

      <Router>

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