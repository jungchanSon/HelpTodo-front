import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import styled from "styled-components";

export default function Home() {
  return (
    <div >
      main page <br/>
      사용방법!

      <H1>팀장</H1>
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