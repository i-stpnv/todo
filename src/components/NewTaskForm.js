import React from 'react'
import PropTypes from 'prop-types'

export default class NewTaskForm extends React.Component {
  state = {
    value: '',
  }

  onValueChange = (evt) => {
    this.setState({
      value: evt.target.value,
    })
  }

  onSubmit = (evt) => {
    evt.preventDefault()
    if (this.state.value.trim() !== '') {
      this.props.onTaskAdded(this.state.value)
    }
    this.setState({
      value: '',
    })
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          onChange={this.onValueChange}
          value={this.state.value}
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
        />
      </form>
    )
  }
}

NewTaskForm.propTypes = {
  onTaskAdded: PropTypes.func,
}
