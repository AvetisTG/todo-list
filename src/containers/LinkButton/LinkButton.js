import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Link } from "react-router-dom";

import './styles.css'

class LinkButton extends Component {

  render() {
    return (
      <div className='wrapper'>
        <Link to={this.props.path}><button>{this.props.name}</button></Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.tasksReducer.tasks,
})

export default connect(mapStateToProps)(LinkButton);