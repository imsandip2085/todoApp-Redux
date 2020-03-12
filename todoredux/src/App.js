import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { connect } from "react-redux";
import { getTodo, addTodo } from "./action/addTodo";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      data: [],
      onclick: false
    };
  }
  componentWillMount() {
    this.props.getTodoRequest();
  }
  handleSubmit = e => {
    this.setState({ inputValue: "" });
    this.props.addTodoRequest();
    let id = this.props.getTodo.data.length;
    let newData = [
      ...this.props.getTodo.data,
      ...[
        {
          id: id,
          name: this.state.inputValue,
          checked: false
        }
      ]
    ];
    this.props.addTodoRequest(newData);
    e.preventDefault();
    if (this.state.inputValue === "") {
      this.setState({ onclick: false });
    } else {
      this.setState({ onclick: true });
    }
  };
  handleChange = e => {
    this.setState({ inputValue: e.target.value });
  };
  handleEventChange = event => {
    let checkValue = event.target.name;
    let data = this.props.getTodo.data.map(val => {
      if (val.name === checkValue) {
        val.checked = !val.checked;
      }
      return val;
    });
    this.setState({ data: data });
  };
  render() {
    if (!this.props.getTodo.data) return null;
    return (
      <div className="App">
        <h3>Todo App</h3>
        <ul>
          {this.props.getTodo.data.map((val, key) => {
            return (
              <li key={key}>
                <input
                  checked={val.checked}
                  type="checkbox"
                  id={val.id}
                  value={val.checked}
                  name={val.name}
                  onChange={this.handleEventChange}
                />
                <span>{val.name}</span>
                {val.checked ? (
                  <span className="badge badge-secondary ">Checked</span>
                ) : null}
              </li>
            );
          })}
        </ul>
        <input
          type="text"
          className={this.state.onclick ? "form_button" : "form_button1"}
          placeholder="Todo..."
          value={this.state.inputValue}
          onChange={this.handleChange}
        ></input>
        <br />
        <button type="submit" onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}

const getProps = state => {
  return { getTodo: state.getTodo, addTodo: state.inputValue };
};

const dispatchProps = dispatch => ({
  getTodoRequest: () => dispatch(getTodo()),
  addTodoRequest: data => dispatch(addTodo(data))
});
export default connect(getProps, dispatchProps)(App);
