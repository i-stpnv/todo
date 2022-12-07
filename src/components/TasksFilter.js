import React from 'react'
import PropTypes from 'prop-types'

export default class TasksFilter extends React.Component {
  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ]

  render() {
    const { filter, onFiltered } = this.props
    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name
      return (
        <li key={name}>
          <button onClick={() => onFiltered(name)} className={isActive ? 'selected' : null}>
            {label}
          </button>
        </li>
      )
    })

    return <ul className="filters">{buttons}</ul>
  }
}

TasksFilter.defaultProps = {
  filter: 'all',
}

TasksFilter.propTypes = {
  filter: PropTypes.string,
  onFiltered: PropTypes.func,
}
