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

/* ATTEMPTED FIX FOR LOGIN DELAY
function App() {
  const [auth, setState] = useState(null);

  useEffect(() => {
    if (localStorage.uid) setState(1)
    else
      setTimeout(() => {
        if (localStorage.uid) setState(1)
        else setState(0)
      }, 500)
  }, [])

  if (auth === 0) {
    return (
      <BrowserRouter>
        <ParticlesElement />
        <LoginPage />
      </BrowserRouter>
    )
  } else if (auth === 1) {
    return (<BrowserRouter>
      <ParticlesElement />
      <Switch>
        <Route exact path='/note' render={props => <NotePage {...props} />} />
        <Route exact path="/logout" render={props => <LogOut {...props} />} />
        <Route exact path="/" render={props => <HomePage {...props} />} />
      </Switch>
    </BrowserRouter>
    )
  } else return (
    <BrowserRouter>
      <ParticlesElement />
      <h1 style={{ color: "white", top: "0", left: '0' }}>Loading</h1>
    </BrowserRouter>
  )
}
*/

function Auth() {
  if (localStorage.uid) return true
  else return false
}

function LogOut() {
  localStorage.clear()
  window.location.reload(false)
  return <Redirect to='/' />
}

export default App;