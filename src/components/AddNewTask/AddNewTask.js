import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addNewTask} from '../../reducers/tasks/actions'



import './styles.css'

class AddNewTask extends Component {
  state = {
    username: '',
    usernameValidated: false,
    email: '',
    emailValidated: false,
    text: '',
    textValidated: false,
    file: null,
    fileUrl: null,
    allFieldsWritten: true,
    preview: false
  }

  handleUsernameChange = (event) => {
    this.setState({
      username: event.target.value
    })
    if (this.state.username !== ''){
      this.setState({
        usernameValidated: true
      })
    } else {
      this.setState({
        usernameValidated: false
      })
    }
  }

  handleEmailChange = (event) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.setState({
        email: event.target.value,
      })
    if (emailRegex.test(String(event.target.value).toLowerCase())){
      this.setState({
        emailValidated: true
      })
    } else {
      this.setState({
        emailValidated: false
      })
    }
  }

  handleTextChange = (event) => {
    this.setState({
      text: event.target.value
    })
  }

  handleFileUpload = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    const url = reader.readAsDataURL(file)
    this.setState({
      file
    })
    reader.onloadend = function (e) {
      this.setState({
        fileUrl: [reader.result]
      })
    }.bind(this);
  }

  handlePreview = (event) => {
    event.preventDefault()
    const {emailValidated, username, text, file} = this.state
    if (username !== '' && text !== '' && emailValidated && file) {
      this.setState({
        preview: !this.state.preview
      })
    } else {
      this.setState({
        allFieldsWritten: false
      })
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const {emailValidated, username, email, text, file} = this.state

    if (username !== '' && text !== '' && emailValidated && file) {
      await this.props.dispatch(addNewTask(username, email, text, file))
      this.setState({
        allFieldsWritten: true
      })
      this.props.history.push('/')
    } else {
      this.setState({
        allFieldsWritten: false
      })
    }
  }

  render() {
    const {allFieldsWritten, preview, username, email, text, fileUrl} = this.state
    return (
      <div className='form-wrapper'>
        <form>
          <label>
            Username:
            <input type="text" value={username} onChange={this.handleUsernameChange} />
          </label>
          <label>
            Email:
            <input type="text" value={email} onChange={this.handleEmailChange} />
          </label>
          <label>
            Text:
            <input type="text" value={text} onChange={this.handleTextChange} />
          </label>
          <label>
            Upload Image:
            <input type="file" onChange={this.handleFileUpload} />
          </label>
          <button onClick={this.handlePreview}>Preview</button>
          <button onClick={this.handleSubmit}>Add</button>
        </form>
        {!allFieldsWritten && <p className='warning-message'>Please fill all fields and check your email</p>}

        {preview &&
        <div className='task-wrapper'>
          <div className='task-text-wrapper'>
            <p>user: <span>{username}</span></p>
            <p>email: <span>{email}</span></p>
            <p>text: <span>{text}</span></p>
          </div>
          <div>
            <img src={fileUrl} alt="test"/>
          </div>
        </div>
        }
      </div>
    );
  }
}


export default connect()(AddNewTask);