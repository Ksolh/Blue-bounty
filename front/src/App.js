import React, { useState, useEffect } from "react";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter,
} from "react-router-dom";
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/Login"
import NotePage from './pages/Note'
import userService from './services/user.service';
import ParticlesElement from "./components/particles"
import "./App.css"

function App2() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    if (!users) {
      getUsers();
    }
  })

  const getUsers = async () => {
    let res = await userService.getAll();
    setUsers(res);
  }

  const renderUser = user => {
    return (
      <div>
        <h1>{user.first_name}</h1>
        <h1>{user.last_name}</h1>
      </div>
    );
  };

  return (
    <div>
      {(users && users.length > 0) ? (
        users.map(user => renderUser(user))
      ) : (
          <p>No users found</p>
        )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ParticlesElement />
      {Auth() ? (
        <Switch>
          <Route exact path='/note' render={props => <NotePage {...props} />} />
          <Route exact path="/" render={props => <HomePage {...props} />} />
        </Switch>
      ) : (
          <LoginPage />
        )}

    </BrowserRouter>
  )
}

function Auth() {
  if (localStorage.uid) return true
  else return false
}

export default App;