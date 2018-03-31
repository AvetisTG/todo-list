import React, {Component} from 'react'
import {connect} from 'react-redux'
import Tasks from './containers/Tasks'
import LinkButton from '../../containers/LinkButton'

class Home extends Component {

  render() {
    return (
      <div>
        <LinkButton path='/add-new-task' name='Add new task'/>
        <Tasks/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  totalCount: state.tasksReducer.totalCount,
})

export default connect(mapStateToProps)(Home);