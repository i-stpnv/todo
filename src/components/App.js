import React from 'react'
import '../index.css'
import { v4 as uuidv4 } from 'uuid'

import NewTaskForm from './NewTaskForm'
import TaskList from './TaskList'
import Footer from './Footer'

export default class App extends React.Component {
  state = {
    filter: 'all',
    todoData: [
      {
        description: 'Create ToDo app',
        completed: true,
        created: Date.now() - 2660000000, // 1 month ago
        id: uuidv4(),
      },
      {
        description: 'Drink coffee',
        completed: false,
        created: Date.now() - 7300000, // 2 hrs ago
        id: uuidv4(),
      },
      {
        description: 'Go outside',
        completed: false,
        created: Date.now() - 700000000, // more than a week ago
        id: uuidv4(),
      },
    ],
  }

  createTask(description) {
    return {
      description,
      completed: false,
      created: Date.now(),
      id: uuidv4(),
    }
  }

  addTask = (description) => {
    const newTask = this.createTask(description)
    this.setState(({ todoData }) => {
      const newTodoData = [...todoData, newTask]

      return { todoData: newTodoData }
    })
  }

  editTask = (id, description) => {
    this.setState(({ todoData }) => {
      const taskIndex = todoData.findIndex((el) => el.id === id)
      const oldTask = todoData[taskIndex]
      const newTask = { ...oldTask, description }
      const newTodoData = [...todoData.slice(0, taskIndex), newTask, ...todoData.slice(taskIndex + 1)]

      return { todoData: newTodoData }
    })
  }

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const delIndex = todoData.findIndex((el) => el.id === id)
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

  onToggleTaskStatus = (id) => {
    this.setState(({ todoData }) => {
      const taskIndex = todoData.findIndex((el) => el.id === id)
      const oldTask = todoData[taskIndex]
      const newTask = { ...oldTask, completed: !oldTask.completed }
      const newTodoData = [...todoData.slice(0, taskIndex), newTask, ...todoData.slice(taskIndex + 1)]

      return { todoData: newTodoData }
    })
  }

  filterTasks(todos, filter) {
    switch (filter) {
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
            onEdited={(id, description) => this.editTask(id, description)}
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
