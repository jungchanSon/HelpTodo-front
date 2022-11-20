import {NextPage} from "next";
import styled from "styled-components";
import React from "react";
import {useSession} from "next-auth/react";
import RequestLogin from "../../components/RequestLogin";

const teamcodePage = () => {
  const {data: session} = useSession();

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
            <FormCode>
              <InputCode type="text"/> <br/>
              <SubmitCode type="submit" value={"팀 생성하기"}/>
            </FormCode>
          </InputTeamCode>
          <InputTeamCode>
            팀 초대 코드 입력
            <FormCode>
              <InputCode type="text"/><br/>
              <SubmitCode type="submit" value={"팀 가입하기"}/>
            </FormCode>
          </InputTeamCode>
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