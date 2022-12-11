import React from 'react';
import styled from "styled-components";
import Container from 'react-bootstrap/Container';
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
          <nav class="navbar sticky-top" style={{backgroundColor: "#e3f2fd"}}>


            <LinkLayout>
              <button type="button"
                      className="mx-3 btn btn-outline-primary">홈
              </button>
              <Link href="/teamlist">
                <button type="button"
                        className="mx-3 btn btn-outline-primary">팀 목록
                </button>
              </Link>
              <Link className={" btn-outline-primary"} href="/teamcode">
                <button type="button"
                        className="mx-3 btn btn-outline-primary">팀 생성&가입
                </button>
              </Link>
            </LinkLayout>

            <LoginLayout>

              <span onClick={() => {signOut()}} className={"px-4 hover:bg-gray-100 text-lg font-bold" }>


                <button type="button"
                      className="btn btn-outline-danger">{userName} (로그아웃)</button>
              </span>
            </LoginLayout>

          </nav>

            <Nav>
              <Link href="/">
                <Image src={logo} alt={"로고"}/>
              </Link>

              <RightLayout>

              </RightLayout>
            </Nav>
        </div>
    )
  }else
  return (
      <div>
        <nav class="navbar sticky-top" style={{backgroundColor: "#e3f2fd"}}>
          <div class="container-fluid">
            <LinkLayout>
              <Link href="/">
                <button type="button"
                        className="mx-3 btn btn-outline-primary">홈
                </button>
              </Link>
              <Link href="/teamlist">
                <button type="button"
                        className="mx-3 btn btn-outline-primary">팀 목록
                </button>
              </Link>
              <Link href="/teamcode">
                <button type="button"
                        className="mx-3 btn btn-outline-primary">팀 생성&가입
                </button>
              </Link>
            </LinkLayout>

            <LoginLayout>
              <span onClick={() => {signIn()}} className={"px-4 hover:bg-gray-100 text-lg font-bold" }>
                <button type="button"
                        className="btn btn-outline-success">로그인</button>
              </span>
              <Link href={"/signup"} className={"px-4 hover:bg-gray-100 text-lg font-bold"}>
                <button type="button" className="btn btn-outline-info">회원가입
                </button>
              </Link>
            </LoginLayout>
          </div>
        </nav>
        <Nav>
          <Link href="/">
            <Image src={logo} alt={"로고"}/>
          </Link>
          <h3 className={"my-auto"}>팀프로젝트 계획을 도와드립니다 !</h3>
          <RightLayout>
          </RightLayout>
        </Nav>
      </div>
  );
}

const A = styled.div`
  font-size: 30px;
  margin: 0 1vw;
`

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  
  padding: 0 5%;
  
  border-bottom: 2px solid darkslategray;
`

const LinkLayout = styled.div`
  display: flex;
  align-items: center;
`
const RightLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const LoginLayout = styled.div`
`