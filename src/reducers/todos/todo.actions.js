import types from "./todo.constans";
export const addTodo = (item) => ({ type: types.ADD_TODO, payload: item });
export const editTodo = (item) => ({ type: types.EDIT_TODO, payload: item });
export const removeTodo = (id) => ({ type: types.REMOVE_TODO, payload: id });
export const changeTodo = (id) => ({ type: types.CHANGE_TODO, payload: id });
export const getTodo = (id) => ({ type: types.GET_TODO, payload: id });
