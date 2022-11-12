import styled from "styled-components";

import Image from "next/image";
import logo from "/public/logo.jpg"
import Link from "next/link";

export default function Navbar(props={data}) {
  return (
      <Button >
        {props.data}
      </Button >
  )
}
const Button = styled.div`
  display: inline-box;
  padding: 5px;
  border: 1px solid black;
`