import React from "react";
import {
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/Login"
import NotePage from './pages/Note'
import ParticlesElement from "./components/particles"
import "./App.css"


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