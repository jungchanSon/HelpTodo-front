import React, {useEffect} from 'react';
import styled from "styled-components";
import {useSession} from "next-auth/react";
import userStore from "../store/user";

export default function index() {
  const {data: session} = useSession();
  const {userName, setUserName, userId, setUserId} = userStore()
  console.log(userName, userId)
  return (
    <div>

      main page <br/>
      사용방법!

      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Email
          address</label>
        <input type="email" className="form-control"
               id="exampleFormControlInput1" placeholder="name@example.com" />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">Example
          textarea</label>
        <textarea className="form-control" id="exampleFormControlTextarea1"
                  rows="3"></textarea>
      </div>


      <H1 className={"text-3xl font-bold underline"}>팀장</H1>
          <H2>1. 팀 생성해주세요.</H2>
          <H2>2. 팀원에게 팀 코드를 보내주세요.</H2>
      <hr/>
      <H1>팀원</H1>
        <H2>1. 팀장에게 받은 팀 코드를 입력해주세요.</H2>
        <H2>2. 내 팀 목록에서 가입된 팀에 들어가주세요.</H2>
      <hr/>
      <H1>투두리스트 만들기</H1>

      <hr/>
      <H1>파일 관리하기</H1>

      <hr/>
      <H1>코멘트 달기</H1>

      <hr/>
      <H1>채팅하기</H1>

      <hr/>
      <H1>화상채팅하기</H1>

      <hr/>
    </div>
  )
}
const H1 = styled.h1`
      
`

const H2 = styled.h2`
    margin-left: 2vw;
`