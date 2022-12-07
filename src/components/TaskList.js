import React from 'react'
import PropTypes from 'prop-types'

import Task from './Task'

export default class TaskList extends React.Component {
  render() {
    const { todos, onDeleted, onEdited, onToggleTaskStatus } = this.props

    const tasks = todos.map((todo) => {
      const { id, ...todoProps } = todo

      return (
        <Task
          key={id}
          {...todoProps}
          onToggleTaskStatus={() => onToggleTaskStatus(id)}
          onEdited={(description) => onEdited(id, description)}
          onDeleted={() => onDeleted(id)}
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
  onEdited: PropTypes.func,
  onToggleTaskStatus: PropTypes.func,
}
