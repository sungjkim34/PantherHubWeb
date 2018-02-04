import React, { Component } from 'react';
import './App.css';
import Home from './Containers/Home/Home';
import Login from './Containers/Login/Login';
import NotFound from './Containers/NotFound/NotFound';
import { logOutUser } from './Services/AuthService';
import { Switch, Route, Link } from 'react-router-dom';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      accountInfo: undefined
    }
  }

  componentWillMount() {
    const loggedInUser = JSON.parse(window.sessionStorage.getItem('loggedInUser'));
    const loggedInTime = JSON.parse(window.sessionStorage.getItem('loggedInTime'));
    this.setState({accountInfo: loggedInUser, isLoggedIn: !!loggedInUser});
  }

  login = (accountInfo) => {
    this.setState({accountInfo: accountInfo, isLoggedIn: true});
  }

  logout = () => {
    logOutUser();
    this.setState({isLoggedIn: false, accountInfo: undefined});
  }

  render() {
    
    const { accountInfo, isLoggedIn } = this.state;

    return (
      <div className="App">
        <Switch>
          <Route exact path='/' render={(props) => <Home {...props} logout={() => this.logout()} accountInfo={accountInfo}/>}/>
          <Route path='/login' render={(props) => <Login {...props} isLoggedIn={this.state.isLoggedIn} login={(accountInfo) => this.login(accountInfo)}/>}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    );
  }
}

export default App;
