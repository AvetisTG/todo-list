import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchTasks} from '../../../../reducers/tasks/actions'
import './styles.css'

class Tasks extends Component {
  state = {
    currentPage: 1
  }

  componentWillMount() {
    this.props.dispatch(fetchTasks());
  }

  renderPages = () => {
    const {totalCount} = this.props
    let pagesCount = Math.ceil(totalCount / 3)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i)
    }
    return pages
  }

  handlePageChange = (page) => {
    this.props.dispatch(fetchTasks(page));
    this.setState({
      currentPage: page
    })
  }

  render() {
    const {tasks, fetching, totalCount} = this.props
    const {currentPage} = this.state
    if (fetching) {
      return <div>LOADING</div>
    } else if (totalCount === 0) {
      return <div>No tasks added yet</div>
    } else {
      return (
        <div className='tasks-wrapper'>
          {tasks && tasks.map(task => (
            <div className='task-wrapper' key={task.id}>
              <div className='task-text-wrapper'>
                <p>id: <span>{task.id}</span></p>
                <p>user: <span>{task.username}</span></p>
                <p>email: <span>{task.email}</span></p>
                <p>text: <span>{task.text}</span></p>
                <h5>{task.status > 0 ? 'Done' : 'Not Done'}</h5>
              </div>
              <div>
                <img src={task.image_path} alt="test"/>
              </div>
            </div>
          ))}
          <div className='pages'>
            {this.renderPages().map(page => {
              return (
                <button key={page} className={page === currentPage ? 'active-page' : ''} onClick={() => this.handlePageChange(page)}>{page}</button>
              )
            })}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  tasks: state.tasksReducer.tasks,
  fetching: state.tasksReducer.fetching,
  totalCount: state.tasksReducer.totalCount,
})

export default connect(mapStateToProps)(Tasks);