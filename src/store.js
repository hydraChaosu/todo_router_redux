import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import todos from "./reducers/todos/todo.reducer";

export default createStore(todos, composeWithDevTools());
