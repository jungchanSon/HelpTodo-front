import React, {useEffect} from 'react';
import styled from "styled-components";
import userStore from "../store/user";
import {Accordion} from "react-bootstrap";
import leader from "../public/aaa.jpg"
import Image from "next/image";
import inputteam from "../public/input.png"
import axios from "axios";
const Index = () => {
  const {userName, setUserName, userId, setUserId} = userStore()

  console.log("userStore", userName, userId)
  console.log(">>>>>>1 " , process.env.NEXT_PUBLIC_LOGIN)
  console.log(">>>>>>2 " , process.env.LOGIN+"")
  console.log(">>>>>> " , process.env.NEXT_PUBLIC_LOCALURL_BACK)
  console.log(">>>>>> " , process.env.NEXT_PUBLIC_LOCALURL_BACK+"")
  useEffect(()=>{
      const reqData = {
        id: "jung",
        pw: "chan"
      }
      axios.post(process.env.LOGIN+"", null, {params : reqData}).then((res)=> {
        console.log(res)
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