import React, { useEffect } from 'react'
import { BrowserRouter as Router , Switch,Route } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import LoginPage from './LoginPage/LoginPage';
import { connectedWithWebSocket } from './utils/websocket/socketconnection'


function App() {

  useEffect(()=>{
    connectedWithWebSocket();
  },[]);

  return (
    <Router>
      <Switch>
        <Route path='/dashboard'>
          <Dashboard/>
        </Route>
        <Route path='/'>
          <LoginPage/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App