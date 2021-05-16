import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import {LoginPage, RegistrationPage, UsersPage, TasksPage} from "../pages";
import "./App.scss";

const App = () => {
  
  return (
    <div className="app">

      <Router>

        <Route exact path="/">
          <LoginPage />
        </Route>

        <Route exact path="/registration">
          <RegistrationPage />
        </Route>

        <Route exact path="/users">
          <UsersPage />
        </Route>

        <Route exact path="/tasks">
          <TasksPage />
        </Route>
      
      </Router>

    </div>
  );
}

export default App;