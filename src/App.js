import React, { Component } from 'react';
import './App.css';
import Home from './Containers/Home/Home';
import Login from './Containers/Login/Login';
import NotFound from './Containers/NotFound/NotFound';
import { Switch, Route, Link } from 'react-router-dom'

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      accountInfo: undefined
    }
  }

  componentWillMount() {
    const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));
    const loggedInTime = JSON.parse(window.localStorage.getItem('loggedInTime'));
    // TODO: Check to see if user is timed out and if so log out user.
    this.setState({accountInfo: loggedInUser});
  }

  login = (accountInfo) => {
    this.setState({accountInfo: accountInfo});
  }

  render() {
    
    const { accountInfo } = this.state;

    return (
      <div className="App">
        {/* <header className="App-header">
          <h1 className="App-title">PantherHub Web</h1>
          <Link to='/test'>Test</Link>
        </header> */}
        <Switch>
          <Route exact path='/' render={(props) => <Home {...props} accountInfo={accountInfo}/>}/>
          <Route path='/login' render={(props) => <Login {...props} login={(accountInfo) => this.login(accountInfo)}/>}/>
          {/* <Route path='/main' component={Main}/> */}
          <Route component={NotFound}/>
        </Switch>
      </div>
    );
  }
}

export default App;
