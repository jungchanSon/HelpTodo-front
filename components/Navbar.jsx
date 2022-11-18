import React from 'react';
import styled from "styled-components";

import Image from "next/image";
import logo from "/public/logo.jpg"
import Link from "next/link";
export default function Navbar() {
  return (
      <div>
        <Nav>
          <Link href="/">
            <Image src={logo} alt={"로고"}/>
          </Link>

          <RightLayout>
            <LoginLayout>
              <Link href={"/login"} className={"px-4 hover:bg-gray-100 text-lg font-bold" }>
                로그인
              </Link>
              <Link href={"/signup"} className={"px-4 hover:bg-gray-100 text-lg font-bold"}>
                회원가입
              </Link>
            </LoginLayout>
            <LinkLayout>
              <Link href="/">
                <A className={"border border-indigo-600"}>홈</A>
              </Link>
              <Link href="/teamlist">
                <A>내 팀 목록</A>
              </Link>
              <Link href="/teamcode">
                <A>팀 생성 & 가입</A>
              </Link>
            </LinkLayout>
          </RightLayout>
        </Nav>
      </div>
  );
}

const A = styled.div`
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
const RightLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-end;
`

const LoginLayout = styled.div`
`