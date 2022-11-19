import React from 'react';
import styled from "styled-components";

import userStore from "/store/user";
import Image from "next/image";
import logo from "/public/logo.jpg"
import Link from "next/link";
import {signIn, signOut,useSession} from "next-auth/react";

export default function Navbar() {
  const {data: session} = useSession();
  const {userName, setUserName} = userStore()

  if(session){
    console.log(userName)
    return(
        <div>
          <Nav>
            <Link href="/">
              <Image src={logo} alt={"로고"}/>
            </Link>

            <RightLayout>
              <LoginLayout>
                <span onClick={() => {signOut()}} className={"px-4 hover:bg-gray-100 text-lg font-bold" }>{userName} (로그아웃)</span>
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
    )
  }else
  return (
      <div>
        <Nav>
          <Link href="/">
            <Image src={logo} alt={"로고"}/>
          </Link>

          <RightLayout>
            <LoginLayout>
              <span onClick={() => {signIn()}} className={"px-4 hover:bg-gray-100 text-lg font-bold" }>로그인</span>
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