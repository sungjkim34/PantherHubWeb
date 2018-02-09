import React, { Component } from 'react';
import './App.css';
import Admin from './Containers/Admin/Admin';
import Chat from './Containers/Chat/Chat';
import Class from './Containers/Class/Class';
import Home from './Containers/Home/Home';
import Login from './Containers/Login/Login';
import Enrollment from './Containers/Enrollment/Enrollment';
import NotFound from './Containers/NotFound/NotFound';
import AdminManage from './Containers/Admin/AdminManage';
import { logOutUser } from './Services/AuthService';
import { getUserInfo } from './Services/UserService';
import { Switch, Route } from 'react-router-dom';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      accountInfo: undefined,
      userInfo: undefined
    }
  }

  componentWillMount() {
    const loggedInUser = JSON.parse(window.sessionStorage.getItem('loggedInUser'));
    // const loggedInTime = JSON.parse(window.sessionStorage.getItem('loggedInTime'));
    this.setState({accountInfo: loggedInUser, isLoggedIn: !!loggedInUser});
    if(!!loggedInUser) {
      getUserInfo(loggedInUser).then(userInfo => {
          this.setState({userInfo: userInfo});
      });
    }
  }

  login = (accountInfo) => {
    this.setState({accountInfo: accountInfo, isLoggedIn: true});
    getUserInfo(accountInfo).then(userInfo => {
        this.setState({userInfo: userInfo});
    });
  }

  logout = () => {
    logOutUser();
    this.setState({isLoggedIn: false, accountInfo: undefined, userInfo: undefined});
  }

  render() {
    
    const { accountInfo, isLoggedIn, userInfo } = this.state;

    return (
      <div className="App">
        <Switch>
          <Route exact path='/' render={(props) =>
            <Home {...props}
              isLoggedIn={isLoggedIn}
              userInfo={userInfo}
              accountInfo={accountInfo}
              logout={() => this.logout()}/>
          }/>
          <Route path='/login' render={(props) =>
            <Login {...props}
              isLoggedIn={isLoggedIn}
              login={(accountInfo) => this.login(accountInfo)}/>
          }/>
          <Route exact path='/enrollment/manage' render={(props) =>
            <Enrollment {...props}
              isLoggedIn={isLoggedIn}
              userInfo={userInfo}
              accountInfo={accountInfo}
              logout={() => this.logout()}/>
          }/>
          <Route path='/enrollment' render={(props) =>
            <Enrollment {...props}
              isLoggedIn={isLoggedIn}
              userInfo={userInfo}
              accountInfo={accountInfo}
              logout={() => this.logout()}/>
          }/>
          <Route path='/class' render={(props) =>
            <Class {...props}
              isLoggedIn={isLoggedIn}
              userInfo={userInfo}
              accountInfo={accountInfo}
              logout={() => this.logout()}/>
          }/>
          <Route path='/chat' render={(props) =>
            <Chat {...props}
              isLoggedIn={isLoggedIn}
              userInfo={userInfo}
              accountInfo={accountInfo}
              logout={() => this.logout()}/>
          }/>
          <Route path='/admin' render={(props) =>
            <Admin {...props}
              isLoggedIn={isLoggedIn}
              userInfo={userInfo}
              accountInfo={accountInfo}
              logout={() => this.logout()}/>
          }/>
          <Route path='/adminManage' render={(props) =>
            <AdminManage {...props}
              isLoggedIn={isLoggedIn}
              userInfo={userInfo}
              accountInfo={accountInfo}
              logout={() => this.logout()}/>
          }/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    );
  }
}

export default App;
