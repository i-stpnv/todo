import React from 'react'
import './index.css'

import NewTaskForm from './components/NewTaskForm'
import TaskList from './components/TaskList'
import Footer from './components/Footer'

export default class App extends React.Component {
  minKey = 10

  state = {
    filter: 'all',
    todoData: [
      {
        description: 'Create ToDo app',
        completed: true,
        editing: false,
        created: Date.now() - 2660000000, // 1 month ago
        key: 1,
      },
      {
        description: 'Drink coffee',
        completed: false,
        editing: false,
        created: Date.now() - 7300000, // 2 hrs ago
        key: 2,
      },
      {
        description: 'Go outside',
        completed: false,
        editing: false,
        created: Date.now() - 700000000, // more than a week ago
        key: 3,
      },
    ],
  }

  createTask(description) {
    return {
      description,
      completed: false,
      editing: false,
      created: Date.now(),
      key: this.minKey++,
    }
  }

  addTask = (description) => {
    const newTask = this.createTask(description)
    this.setState(({ todoData }) => {
      const newTodoData = [...todoData, newTask]

      return { todoData: newTodoData }
    })
  }

  editTask = (key, description) => {
    this.setState(({ todoData }) => {
      const taskIndex = todoData.findIndex((el) => el.key === key)
      const oldTask = todoData[taskIndex]
      const newTask = { ...oldTask, editing: false, description }
      const newTodoData = [...todoData.slice(0, taskIndex), newTask, ...todoData.slice(taskIndex + 1)]

      return { todoData: newTodoData }
    })
  }

  deleteTask = (key) => {
    this.setState(({ todoData }) => {
      const delIndex = todoData.findIndex((el) => el.key === key)
      const newTodoData = [...todoData.slice(0, delIndex), ...todoData.slice(delIndex + 1)]

      return { todoData: newTodoData }
    })
  }

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.filter((todo) => !todo.completed)

      return { todoData: newTodoData }
    })
  }

  onToggleTaskStatus = (key) => {
    this.setState(({ todoData }) => {
      const taskIndex = todoData.findIndex((el) => el.key === key)
      const oldTask = todoData[taskIndex]
      const newTask = { ...oldTask, completed: !oldTask.completed }
      const newTodoData = [...todoData.slice(0, taskIndex), newTask, ...todoData.slice(taskIndex + 1)]

      return { todoData: newTodoData }
    })
  }

  onStartedEditing = (key) => {
    this.setState(({ todoData }) => {
      const taskIndex = todoData.findIndex((el) => el.key === key)
      const oldTask = todoData[taskIndex]
      const newTask = { ...oldTask, editing: !oldTask.editing }
      const newTodoData = [...todoData.slice(0, taskIndex), newTask, ...todoData.slice(taskIndex + 1)]

      return { todoData: newTodoData }
    })
  }

  filterTasks(todos, filter) {
    switch (filter) {
      case 'all':
        return todos
      case 'active':
        return todos.filter((todo) => !todo.completed)
      case 'completed':
        return todos.filter((todo) => todo.completed)
      default:
        return todos
    }
  }

  onFiltered = (filter) => {
    this.setState({ filter })
  }

  render() {
    const { todoData, filter } = this.state
    const tasksLeft = todoData.filter((task) => !task.completed).length
    const visibleTasks = this.filterTasks(todoData, filter)

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onTaskAdded={this.addTask} />
        </header>
        <section className="main">
          <TaskList
            todos={visibleTasks}
            onToggleTaskStatus={this.onToggleTaskStatus}
            onStartedEditing={this.onStartedEditing}
            onEdited={(key, description) => this.editTask(key, description)}
            onDeleted={this.deleteTask}
          />
          <Footer
            tasksLeft={tasksLeft}
            filter={filter}
            onClearCompleted={this.clearCompleted}
            onFiltered={this.onFiltered}
          />
        </section>
      </section>
    )
  }
}
