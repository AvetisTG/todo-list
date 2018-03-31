import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './components/Home'
import AddNewTask from './components/AddNewTask'

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
            <hr />
            <Route exact path="/" component={Home} />
            <Route path="/add-new-task" component={AddNewTask} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
