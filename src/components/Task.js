import React from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

export default class Task extends React.Component {
  state = {
    description: this.props.description,
  }

  onDescriptionChange = (evt) => {
    this.setState({
      description: evt.target.value,
    })
  }

  changeDescription = (evt) => {
    evt.preventDefault()
    if (this.state.description !== '') {
      this.props.onEdited(this.state.description)
    }
  }

  render() {
    const { description, onStartedEditing, onDeleted, onToggleTaskStatus, completed, editing, created } = this.props

    const createTime = `created ${formatDistanceToNow(created, { includeSeconds: true })} ago`

    let classNames = ''
    if (completed) classNames += ' completed'
    if (editing) classNames += ' editing'

    const editingForm = (
      <form onSubmit={this.changeDescription}>
        <input onChange={this.onDescriptionChange} type="text" className="edit" value={this.state.description} />
      </form>
    )

    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={onToggleTaskStatus} checked={completed} />
          <label>
            <span className="description">{description}</span>
            <span className="created">{createTime}</span>
          </label>
          <button className="icon icon-edit" onClick={onStartedEditing}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {editing ? editingForm : null}
      </li>
    )
  }
}

Task.defaultProps = {
  description: '',
  completed: false,
  editing: false,
}

Task.propTypes = {
  description: PropTypes.string,
  completed: PropTypes.bool,
  editing: PropTypes.bool,
  onStartedEditing: PropTypes.func,
  onDeleted: PropTypes.func,
  onToggleTaskStatus: PropTypes.func,
}
