import { ToggleTodo, AddTodo } from "./index";
import { TOGGLE_TODO, ADD_TODO } from "../constant";
import App from "../App";
import data from "../data.json";

export function addTodo(data) {
  return async function(dispatch, getstate) {
    dispatch(ToggleTodo({ data: data }));
  };
}

export function getTodo() {
  return async function(dispatch, getstate) {
    dispatch(ToggleTodo({ data: data }));
  };
}
