import styled from "styled-components";

import Image from "next/image";
import logo from "/public/logo.jpg"
import Link from "next/link";
import MyButton from "/components/MyButton"
export default function Navbar() {
  return (
      <div >
        <Nav>
          <Link href="/" >
            <Image src={logo} />
          </Link>


          <LinkLayout >
            <Link href="/" >
              <A>홈</A >
            </Link>
            <Link href="/teamlist" >
              <A>내 팀 목록</A >
            </Link>
            <Link href="/mytodo" >
              <A>내 할일 목록</A >
            </Link>
          </LinkLayout>
        </Nav>
      </div >
  )
}

const A = styled.a`
  border: 3px solid blue;
  font-size: 30px;
  margin: 0 1vw;
`
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  border: 3px solid black;
  
  padding: 0 5%;
`

const LinkLayout = styled.div`
  display: flex;
  align-items: center;
`
