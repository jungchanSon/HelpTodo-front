import {NextPage} from "next";
import styled from "styled-components";
import React from "react";
import {useSession} from "next-auth/react";
import RequestLogin from "../../components/RequestLogin";
import axios from "axios";
import Router from "next/router";
// @ts-ignore
import TeamList from "/components/TeamCode/TeamList";

const teamcodePage = () => {
  const {data: session} = useSession();

  const submitCreateTeam = (e) => {
    e.preventDefault()

    const userId = session.token.token.user.id
    const teamName = e.target.teamName.value;
    const teamPW = e.target.teamPw.value;

    const createTeamData = {
      memberId: userId,
      teamName: teamName,
      teamPassword: teamPW,
    }
    //
    axios.post(process.env.NEXT_PUBLIC_LOCALURL_BACK+"/team/create", null, {params: createTeamData} ).then((res)=>{
      console.log(res.data)
    })

    console.log(teamName)


  }

  // if(!session){
  //   return(
  //       <RequestLogin />
  //   )
  // } else
  return(
      <>
        <LayoutContainer>

          <InputTeamCode>
            팀 생성 하기
            <FormCode onSubmit={submitCreateTeam}>
              <InputCode type="text" placeholder={"팀 이름"} name={"teamName"}/> <br/>
              <InputCode type="text" placeholder={"팀 비번"} name={"teamPw"}/> <br/>
              <SubmitCode type="submit" value={"팀 생성하기"}/>
            </FormCode>
          </InputTeamCode>
          <InputTeamCode>
            팀 초대 코드 입력
            <FormCode>
              <InputCode type="text" placeholder={"팀 코드"}/><br/>
              <SubmitCode type="submit" value={"팀 가입하기"}/>
            </FormCode>
          </InputTeamCode>

          <TeamList></TeamList>
        </LayoutContainer>


      </>
  )
}
const LayoutContainer = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
`

const InputTeamCode = styled.div`
      border: 1px solid black;
      margin: 5vh;
      padding: 4vh;
`
const FormCode = styled.form`
  
`
const InputCode = styled.input`

`
const SubmitCode = styled.input`

`
export default teamcodePage