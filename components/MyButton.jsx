import styled from "styled-components";

import Image from "next/image";
import logo from "/public/logo.jpg"
import Link from "next/link";

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