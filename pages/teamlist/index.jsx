import React from 'react';
import styled from "styled-components";
import RequestLogin from "../../components/RequestLogin";
import {useSession} from "next-auth/react";
import axios from "axios";

const teamListPage = () => {
  const {data: session} = useSession();
  let userId = null;
  if(session)
    userId = session.token.token.user.id

  const userIdData = {
    userId : userId
  }

  axios.get(process.env.NEXT_PUBLIC_LOCALURL_BACK+"/team/findTeamList", null).then((res)=>{
    console.log("getRooms")
    console.log(res.data)
    setRooms(res.data)
    console.log("rooms", rooms)
  }).catch((e) => {

    console.log(e)
  })
  console.log("userid >", userId)
  axios.get(process.env.NEXT_PUBLIC_LOCALURL_BACK+"/team/findMyTeam", {params: userIdData}).then((res)=>{
    console.log("getMyRooms")
    console.log(res.data)
    setMyRooms(res.data)
    console.log("myRooms", myRooms)

  }).catch((e) => {

    console.log(e)
  })

  if(!session){
    return(
      <RequestLogin />
    )
  } else
  return (
      <div>
        <TeamlistContainer>

            <TeamList className={""} >
                  내 팀 목록
            </TeamList>
        </TeamlistContainer>
      </div>
  )
}

const TeamlistContainer = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
`

const CreateTeamCode = styled.div`
      border: 1px solid black;
      margin: 5vh;
      padding: 4vh;
`
const InputTeamCode = styled.div`
      border: 1px solid black;
      margin: 5vh;
      padding: 4vh;
`
const TeamList = styled.h1`
      border: 1px solid red;
      margin: 5vh;
      padding: 4vh;

`
const H1 = styled.h1`

`

const H2 = styled.h2`
    margin-left: 2vw;
`

const FormCode = styled.form`
  
`
const InputCode = styled.input`

`
const SubmitCode = styled.input`

`

export default teamListPage;