import React, { Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import "./App.css";
import Navigation from "./components/Navigation";
import Task from "./components/Task";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const TaskContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 960px;
  margin: 0 auto;
  margin-top: 20px;
`;

function App({ todos, match }) {
  const all = todos.map((todo) => {
    return (
      <Task
        id={todo.id}
        key={todo.id}
        title={todo.title}
        description={todo.description}
        date={todo.date}
        finished={todo.finished}
        createdAt={todo.createdAt}
      />
    );
  });
  const finished = todos.map((todo) => {
    if (todo.finished) {
      return (
        <Task
          id={todo.id}
          key={todo.id}
          title={todo.title}
          description={todo.description}
          date={todo.date}
          finished={todo.finished}
          createdAt={todo.createdAt}
        />
      );
    }
  });
  const unfinished = todos.map((todo) => {
    if (!todo.finished) {
      return (
        <Task
          id={todo.id}
          key={todo.id}
          title={todo.title}
          description={todo.description}
          date={todo.date}
          finished={todo.finished}
          createdAt={todo.createdAt}
        />
      );
    }
  });

  return (
    <Router>
      <Fragment>
        <Navigation />

        <Switch>
          <Route path="/finished">
            <TaskContainer>{finished}</TaskContainer>
          </Route>
          <Route path="/unfinished">
            <TaskContainer>{unfinished}</TaskContainer>
          </Route>
          <Route path="/add">
            <AddTask />
          </Route>
          <Route
            path="/edit/:id"
            render={(props) => <EditTask {...props} />}
          ></Route>
          <Route path="/" exact>
            <TaskContainer>{all}</TaskContainer>
          </Route>
        </Switch>
      </Fragment>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  todos: state.todos,
});

export default connect(mapStateToProps)(App);
