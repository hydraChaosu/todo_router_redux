import types from "./todo.constans";

const INITIAL_STATE = {
  todos: JSON.parse(localStorage.getItem("todos")),
  currentId: Number(localStorage.getItem("id")),
};

export default function todos(state = INITIAL_STATE, action) {
  let newTodos;
  switch (action.type) {
    case types.ADD_TODO:
      const newTodo = {
        id: state.currentId,
        title: action.payload.title ? action.payload.title : "",
        description: action.payload.description
          ? action.payload.description
          : "",
        date: action.payload.date ? action.payload.date : "",
        createdAt: new Date(),
        finished: false,
      };
      const newId = state.currentId + 1;
      localStorage.setItem("todos", JSON.stringify([...state.todos, newTodo]));
      localStorage.setItem("id", newId);
      return {
        ...state,
        todos: [...state.todos, newTodo],
        currentId: newId,
      };
    case types.EDIT_TODO:
      newTodos = [...state.todos].map((todo) => {
        if (todo.id === action.payload.id) {
          todo.title = action.payload.title ? action.payload.title : todo.title;

          todo.description = action.payload.description
            ? action.payload.description
            : todo.description;

          todo.date = action.payload.date ? action.payload.date : todo.date;
        }
        return todo;
      });
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return {
        ...state,
        todos: newTodos,
      };
    case types.CHANGE_TODO:
      newTodos = [...state.todos].map((todo) => {
        if (todo.id === action.payload) {
          todo.finished = !todo.finished;
        }
        return todo;
      });
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return {
        ...state,
        todos: newTodos,
      };
    case types.REMOVE_TODO:
      newTodos = [...state.todos].filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return {
        ...state,
        todos: newTodos,
      };
    default:
      return {
        ...state,
      };
  }
}
