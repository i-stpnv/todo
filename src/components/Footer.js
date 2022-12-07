import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from './TasksFilter'

export default class Footer extends React.Component {
  render() {
    const { filter, onFiltered, tasksLeft, onClearCompleted } = this.props

    return (
      <footer className="footer">
        <span className="todo-count">{tasksLeft} items left</span>
        <TasksFilter filter={filter} onFiltered={onFiltered} />
        <button onClick={() => onClearCompleted()} className="clear-completed">
          Clear completed
        </button>
      </footer>
    )
  }
}

Footer.defaultProps = {
  filter: 'all',
  tasksLeft: 0,
}

Footer.propTypes = {
  filter: PropTypes.string,
  onFiltered: PropTypes.func,
  tasksLeft: PropTypes.number,
  onClearCompleted: PropTypes.func,
}
