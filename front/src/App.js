import React, {useEffect, useState} from "react";
import {
  Switch,
  Route,
  Redirect,
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
          <Route exact path="/logout" render={props => <LogOut {...props} />} />
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

function LogOut() {
  const [state, setState] = useState(null);
  useEffect(() => {
    setTimeout(() => { setState(1) }, 2000)
  })
  localStorage.clear()
  if (!state) return (<div>
    <h1>Redirecting momentarily</h1>
  </div>)
  return <Redirect to='/' />
}

export default App;