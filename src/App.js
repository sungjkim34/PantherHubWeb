import React, { Component } from 'react';
import './App.css';
import Home from './Containers/Home/Home';
import { Switch, Route, Link } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <h1 className="App-title">PantherHub Web</h1>
          <Link to='/test'>Test</Link>
        </header> */}

        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/test' component={Home}/>
        </Switch>
      </div>
    );
  }
}

export default App;
