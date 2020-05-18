import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { connect } from "react-redux";
import { editTodo } from "../reducers/todos/todo.actions";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 660px;
  margin: 10px auto;
  padding: 10px 15px;
  border: 2px solid #538ed8;
  border-radius: 5px;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  & label {
    margin-bottom: 5px;
  }
  & input {
    padding: 5px;
    border: none;
    border-bottom: solid 2px #538ed8;
  }
  & input:focus {
    color: #538ed8;
  }
  & textarea {
    padding: 5px;
    border: solid 2px #538ed8;
  }
  & textarea:focus {
    color: #538ed8;
  }
`;

const SubmitButton = styled.input`
  align-self: flex-start;
  padding: 5px;
  cursor: pointer;
  border-color: #538ed8;
`;

const EditTask = ({ editTodo, edit, match, todos }) => {
  const { register, handleSubmit, watch, errors } = useForm();
  let history = useHistory();
  const [todo, setTodo] = useState(
    todos.find((todo) => todo.id == match.params.id)
  );
  const [deadline, setDeadline] = useState(!!todo.date);
  const onSubmit = (data) => {
    data.id = Number(match.params.id);
    console.log(data);
    editTodo(data);
    history.push("/");
  };

  useEffect(() => {
    console.log(todo);
  }, [todo]);

  function currentDate() {
    let current = "";
    const date = new Date();
    const year = date.getFullYear();
    const month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    return `${year}-${month}-${day}`;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FlexColumn>
        <label htmlFor="title">Tytuł zadania</label>
        <input
          name="title"
          ref={register({ required: true })}
          defaultValue={todo.title}
        />
        {errors.title && <span>This field is required</span>}
      </FlexColumn>
      <FlexColumn>
        <label htmlFor="description">Opis zadania</label>
        <textarea
          name="description"
          ref={register}
          defaultValue={todo.description}
        />
      </FlexColumn>
      <FlexColumn>
        <label htmlFor="deadline">Deadline</label>
        <input
          name="deadline"
          type="checkbox"
          onChange={(e) => setDeadline(!deadline)}
          value={!deadline}
        />
        {deadline && (
          <FlexColumn>
            <label htmlFor="date">Do kiedy należy wykonać zadanie</label>
            <input
              name="date"
              type="date"
              defaultValue={todo.date}
              ref={register({ required: true })}
            />
          </FlexColumn>
        )}
      </FlexColumn>
      <SubmitButton type="submit" value="Dodaj zadanie" />
    </Form>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todos,
});
export default connect(mapStateToProps, { editTodo })(EditTask);
