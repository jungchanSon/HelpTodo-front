import React, {useEffect} from 'react';
import styled from "styled-components";
import userStore from "../store/user";
import {Accordion} from "react-bootstrap";
import leader from "../public/aaa.jpg"
import Image from "next/image";
import inputteam from "../public/input.png"
import axios from "axios";
import { useCookies } from "react-cookie";

const Index = () => {
  const {userName, setUserName, userId, setUserId} = userStore()
  const [cookie, setCookie, removeCookie] = useCookies(['id']);

  console.log("userStore", userName, userId)
  console.log(">>>>>>1 " , process.env.NEXT_PUBLIC_LOGIN)
  console.log(">>>>>>2 " , process.env.LOGIN+"")
  console.log(">>>>>> " , process.env.NEXT_PUBLIC_LOCALURL_BACK)
  console.log(">>>>>> " , process.env.NEXT_PUBLIC_LOCALURL_BACK+"")
  useEffect(()=>{
      const reqData = {
        id: "jung",
        pw: "chan",
      }

      axios.post(process.env.NEXT_PUBLIC_LOGIN+"",null, {params: reqData}).then((res)=> {
        setCookie('id', res.data); //쿠기 저장

        const token = cookie.id;        //쿠키 꺼내기

        axios.defaults.headers.common['Authorization'] = cookie.id //or res.data 등...
        axios.defaults
        console.log("token", token)
      }).then(() => {
        const qt = {
          teamName : "testTeam2",
          memberId : "jung"
        }
        const coo = {
          Authorization: "Bearer "+ cookie.id
        }
        axios.post(process.env.NEXT_PUBLIC_CREATE_TEAM+"", null, {params : qt, headers:coo}).then((res)=> {
          console.log(res.data)
        })
      })


  }, [])

  return (
    <div>
      <Container>
        <h1>사용방법 안내</h1>
        <Accordion defaultActiveKey={['0', '1']} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>팀장</Accordion.Header>
            <Accordion.Body>
              <h5>1. 팀 이름과 비밀번호를 입력해 생성해주세요.</h5>
              <Image src={leader} alt={""}></Image>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>팀원</Accordion.Header>
            <Accordion.Body>
             <h5>1. 팀 비밀번호를 입력 후 입장하기를 눌러주세요.</h5>
              <Image src={inputteam}></Image>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

      </Container>
    </div>
  )
}
const H1 = styled.h1`
  
`

const H2 = styled.h2`
    margin-left: 2vw;
`

const Container = styled.div`
  padding: 3vw 20vw;
`
export default Index;