import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.jpeg';
import './App.css';

import { Checkbox } from 'antd';
import { convertPatternGroupToTask } from 'fast-glob/out/managers/tasks';
import { string } from 'postcss-selector-parser';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [{ title: "你的一个未完成事项", hasFinished: false }],
      inputText: "",
    }
    this.handleAddTodoItem = this.handleAddTodoItem.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleFinish = this.handleFinish.bind(this);
  }

  handleInputChange(e) {
    this.setState({ inputText: e.target.value });
  }

  handleAddTodoItem(e) {
    console.log('click')
    const todos = this.state.todos;
    // NOTE: set state is async
    this.setState(
      {
        // NOTE: spread operator
        todos: [...todos, { title: this.state.inputText, hasFinished: false }]
      }
    );
  }

  // handleFinish(e, id) {
  //   console.log('check')
  // }


  render() {
    return (
      <div className="App">
        <div className="logo-container" >
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <header className="App-header">
          <p>
            My TODO List App
          </p>
        </header>

        <InputPlace handleAdd={this.handleAddTodoItem} handleInput={this.handleInputChange} inputText={this.state.inputText} />

        <div className="todo-container">
          <p>TODO:</p>
          <TodoList todos={this.state.todos} />
        </div>

        <div className="hr"><hr /></div>
        <div className="hasFinished-section"> hasFinished
        {/* TODO */}
        </div>

      </div>
    );
  }
}


class InputPlace extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { handleAdd, handleInput, inputText } = this.props;
    return (
      <div className="new-todo-section">
        <p>create a new one:</p>
        <input onChange={handleInput} value={inputText} type="text" name="firstname" placeholder="new things todo" />
        <button type="button" className="add-button" onClick={handleAdd}>add</button>
      </div>
    )
  }
}

// ============================= class MyTodoThing ==========

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasFinished: false
    };
  }

  hasFinished() {
    this.setState({
      hasFinished: !this.state.hasFinished
    });
  }

  render() {
    let input_text = this.props.input_text;
    if (this.state.hasFinished == true) {
      input_text = <del>{input_text}</del>
    }

    return (
      <li>
        <input type="checkbox" id="check" onClick={() => this.hasFinished()} />
        {input_text}
      </li>
    )
  }
}

//============class TodoList ==============

class TodoList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // NOTE: react list key prop
    var list = this.props.todos.map(i =>
      <Todo input_text={i.title} key={i.title} hasFinished={i.hasFinished} />
    )

    return (
      <ul id="todolist">
        {list}
      </ul>
    );
  }

}


export default App;
