import React from 'react';
import styled from "styled-components";


export default function Navbar(props={data}) {
  return (
      <div>
        <Button>
          {props.data}
        </Button>
      </div>
  )
}
const Button = styled.div`
  display: inline-box;
  padding: 5px;
  border: 1px solid black;
`