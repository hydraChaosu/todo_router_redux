import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeTodo, changeTodo } from "../reducers/todos/todo.actions";
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 2px solid #538ed8;
  border-radius: 5px;
  max-width: 360px;
  margin: 0 10px 20px 10px;
`;

const HeaderTask = styled.div`
  display: flex;
  border-bottom: 2px solid #538ed8;
  padding-bottom: 5px;
  justify-content: space-between;

  & a {
    text-decoration: none;
  }

  & button {
    margin-left: 5px;
    border: none;
  }
`;

const InfoTask = styled.div`
  display: flex;
  border-bottom: 2px solid #538ed8;
  padding-bottom: 5px;
`;

const TimeTask = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 5px;
`;

const Task = ({
  title,
  description,
  date,
  removeTodo,
  id,
  changeTodo,
  finished,
  createdAt,
}) => {
  const [remainingTime, setRemainingTime] = useState();
  const [currentTime, setCurrentTime] = useState(Date.now());
  useEffect(() => {
    const localTime = setTimeout(() => {
      setCurrentTime(currentTime - 1000);
      setRemainingTime(calcRemainingTime());
    }, 1000);
    return () => {
      clearTimeout(localTime);
    };
  }, [remainingTime]);

  function calcRemainingTime() {
    const time1 = new Date(`${date}`).getTime();
    if (time1 - currentTime <= 0 || date === "") return false;
    const remaining = ((time1 - currentTime) / 1000).toFixed();
    const hours = Math.floor(remaining / 3600);
    const minutes = Math.floor((remaining / 60) % 60);
    const seconds = remaining % 60;
    return `${hours} godzin, ${minutes} minut ${seconds} sekund`;
  }

  function currentDate() {
    const months = [
      "Styczeń",
      "Luty",
      "Marzec",
      "Kwiecień",
      "Maj",
      "Czerwiec",
      "Lipiec",
      "Sierpień",
      "Wrzesień",
      "Październik",
      "Listopad",
      "Grudzień",
    ];
    const date = new Date(`${createdAt}`);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return `${day} ${months[Number(month)]} ${year}`;
  }

  return (
    <FlexColumn>
      <HeaderTask>
        <p>{title}</p>
        <div>
          <Link to={`/edit/${id}`}>
            <i class="fas fa-edit"></i>
          </Link>
          <button onClick={() => changeTodo(id)}>
            {finished ? (
              <i class="fas fa-check"></i>
            ) : (
              <i class="far fa-times-circle"></i>
            )}
          </button>
          <button onClick={() => removeTodo(id)}>
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </HeaderTask>
      <InfoTask>
        <p>{description}</p>
      </InfoTask>

      <TimeTask>
        <p>
          Utworzono {currentDate()} o godzinie{" "}
          {new Date(`${createdAt}`).toLocaleTimeString()}
        </p>
        {remainingTime && <p>Pozostało {remainingTime}</p>}
      </TimeTask>
    </FlexColumn>
  );
};

export default connect(null, { removeTodo, changeTodo })(Task);
