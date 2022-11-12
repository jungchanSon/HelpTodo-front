import React, {useEffect} from 'react';
import axios from "axios";
import styled from "styled-components";

const Room = () => {
  return (
      <div>
        hihihihi
      </div>
  );
};
const CenterRayout = styled.div` 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    padding: 5%;
`

const ListCard = styled.li`
  margin:10px;
  list-style: none;
  padding: 10px;
  border: 1px solid black;
  color: black;
  cursor: pointer;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: max-content ;
  
`
export default Room;