import styled from "styled-components";
import React from "react";
import {useSession} from "next-auth/react";
import axios from "axios";
import Router from "next/router";
// @ts-ignore
import TeamList from "/components/TeamCode/TeamList";
import userStore from "../../store/user";

const TeamcodePage = () => {
  const {userId, userName, setUserName, setUserId} = userStore();


  // /todolist/all
  const submitCreateTeam = (e) => {
    e.preventDefault()

    // @ts-ignore
    const userId = userId
    const teamName = e.target.teamName.value;
    const teamPW = e.target.teamPw.value;

    const createTeamData = {
      memberId: userId,
      teamName: teamName,
      teamPassword: teamPW,
    }

    axios.post(process.env.NEXT_PUBLIC_LOCALURL_BACK+"/team/create", null, {params: createTeamData} ).then((res)=>{
      console.log(res.data)
      if(res.data === "succ"){
        Router.push('/teamlist')
      }
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
            <h3 >팀 생성 하기</h3> <hr/> <br/>
            <FormCode onSubmit={submitCreateTeam}>
              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">팀 이름</span>
                <input className="form-control"
                       type="text" placeholder={"팀 이름"} name={"teamName"}/>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">팀 패스워드</span>
                <input className="form-control"
                       type="text" placeholder={"팀 비밀번호"} name={"teamPw"}/>
              </div>

              <button type="submit" className="btn btn-outline-success">팀 생성하기</button>
              {/*<InputCode type="text" placeholder={"팀 이름"} name={"teamName"}/> <br/>*/}
              {/*<InputCode type="text" placeholder={"팀 비번"} name={"teamPw"}/> <br/>*/}
              {/*<SubmitCode type="submit" value={"팀 생성하기"}/>*/}
            </FormCode>
          </InputTeamCode>
          <InputTeamCode>
            <h3 >팀 초대 코드로 들어가기</h3> <hr/> <br/>
            <FormCode>
              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">팀 패스워드</span>
                <input className="form-control"
                       type="text" placeholder={"팀 코드"}/>
              </div>
              <button type="submit" className="btn btn-outline-success">팀 가입하기</button>
              {/*<InputCode type="text" placeholder={"팀 코드"}/><br/>*/}
              {/*<SubmitCode type="submit" value={"팀 가입하기"}/>*/}
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
      text-align: center;
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

export default TeamcodePage