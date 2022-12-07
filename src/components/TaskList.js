import React from 'react'
import PropTypes from 'prop-types'

import Task from './Task'

export default class TaskList extends React.Component {
  render() {
    const { todos, onDeleted, onStartedEditing, onEdited, onToggleTaskStatus } = this.props

    const tasks = todos.map((todo) => {
      const { key, ...todoProps } = todo

      return (
        <Task
          key={key}
          {...todoProps}
          onToggleTaskStatus={() => onToggleTaskStatus(key)}
          onStartedEditing={() => onStartedEditing(key)}
          onEdited={(description) => onEdited(key, description)}
          onDeleted={() => onDeleted(key)}
        />
      )
    })

    return <ul className="todo-list">{tasks}</ul>
  }
}

TaskList.defaultProps = {
  todos: [],
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func,
  onStartedEditing: PropTypes.func,
  onEdited: PropTypes.func,
  onToggleTaskStatus: PropTypes.func,
}
