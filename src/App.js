import React, { Component } from 'react';
import './App.css';
import Home from './Containers/Home/Home';
import NotFound from './Containers/NotFound/NotFound';
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
          <Route component={NotFound}/>
        </Switch>
      </div>
    );
  }
}

export default App;
