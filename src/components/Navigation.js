import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const List = styled.ul`
  display: flex;
  list-style: none;
  background: #538ed8;

  & > li {
    margin: 10px 10px;
    padding: 10px 20px;
    border: 2px solid white;
    border-radius: 5px;
  }
`;

const CunstomLink = styled(Link)`
  text-decoration: none;
  text-transform: uppercase;
  color: white;
`;

const Navigation = () => {
  return (
    <nav>
      <List>
        <li>
          <CunstomLink to="/"> Home </CunstomLink>
        </li>
        <li>
          <CunstomLink to="/finished"> finished </CunstomLink>
        </li>
        <li>
          <CunstomLink to="/unfinished"> unfinished </CunstomLink>
        </li>
        <li>
          <CunstomLink to="/add"> add </CunstomLink>
        </li>
      </List>
    </nav>
  );
};

export default Navigation;
