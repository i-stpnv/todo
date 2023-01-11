import React from 'react'
import PropTypes from 'prop-types'
// import { formatDistanceToNow } from 'date-fns'

export default class Task extends React.Component {
  state = {
    description: this.props.description,
    editing: false,
  }

  onStartedEditing = () => {
    this.setState({ editing: true })
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
      this.setState({ editing: false })
    }
  }

  render() {
    // const { description, onDeleted, onToggleTaskStatus, completed, created } = this.props

    // const createTime = `created ${formatDistanceToNow(created, { includeSeconds: true })} ago`

    let classNames = ''
    // if (completed) classNames += ' completed'
    if (this.state.editing) classNames += ' editing'

    const editingForm = (
      <form onSubmit={this.changeDescription}>
        <input onChange={this.onDescriptionChange} type="text" className="edit" value={this.state.description} />
      </form>
    )

    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" />
          {/*
          <input className="toggle" type="checkbox" onChange={onToggleTaskStatus} checked={completed} />
          */}
          <label>
            <span className="title">fw</span>
            <span className="description">
              <button className="icon icon-play"></button>
              <button className="icon icon-pause"></button>
              12:25
            </span>
            <span className="description">created 5 minutes ago</span>
            {/*
            <span className="description">{description}</span>
            <span className="created">{createTime}</span>
            */}
          </label>
          <button className="icon icon-edit" onClick={this.onStartedEditing}></button>
          <button className="icon icon-destroy"></button>
          {/*
          <button className="icon icon-destroy" onClick={onDeleted}></button>
          */}
        </div>
        {this.state.editing ? editingForm : null}
      </li>
    )
  }
}

Task.defaultProps = {
  description: '',
  completed: false,
}

Task.propTypes = {
  description: PropTypes.string,
  completed: PropTypes.bool,
  onDeleted: PropTypes.func,
  onToggleTaskStatus: PropTypes.func,
}
