import React, {useEffect, useRef} from 'react'
import styled, {css, keyframes} from "styled-components";
import axios from "axios";
import {useSession} from "next-auth/react";
import roomData from "../../store/roomData";
import Router from "next/router";
import {log} from "util";

const TeamRoomCard =  ({ name, cDate, creator, type} ) => {
  const {data: session} = useSession();
  const {setRoomName, setRoomCreator, setRoomCreateDate} = roomData()

  let userId = null;

  if(session)
    userId = session.token.token.user.id
  console.log("userIduserIduserIduserId", userId)
  const clickRoom = async (e) =>{
    e.preventDefault()

    if(type==="mine"){
      await setRoomName(name)
      await setRoomCreateDate(cDate)
      await setRoomCreator(creator)

      Router.push('/myteam')
    }

  }
  const enterRoomWithPw = (e) => {
    e.preventDefault()

    const teamPW = e.target.teamPw.value;

    const joinTeamData = {
      userId: userId,
      teamName: name,
      teamPassword: teamPW,
    }
    //
    axios.post(process.env.NEXT_PUBLIC_LOCALURL_BACK+"/team/join", null, {params: joinTeamData} ).then((res)=>{
      console.log(res.data)
    })
    console.log(joinTeamData)
  }

  return(
    <div className="list-group-item list-group-item-action"
       aria-current="true"
        onClick={clickRoom}>
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{name}</h5>
        <small>{cDate}</small>
      </div>
      <p className="mb-1"></p>
      <small>{creator}</small>
      <div className="input-group mb-3">

      </div>
      { type === "other" ?
        <BoxRoomPw className="input-group mb-3"
          onSubmit={enterRoomWithPw}>
          <input type="text" className="form-control"
                 placeholder="방 비밀번호 입력 없을 경우, 공란으로"
                 aria-label="방 비밀번호 입력 없을 경우, 공란으로"
                 aria-describedby="button-addon2"
                  name ={"teamPw"}/>
            <button className="btn btn-outline-secondary" type="submit"
                    id="button-addon2"> 입장
            </button>
        </BoxRoomPw>
          : null
      }
    </div>
  )
}


// 애니메이션 추가하기
const boxFade = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
const BoxRoomPw = styled.form`
  
`
const Content = styled.div`
  width: 100px;
  height: 100px;
  background: #00bfb2;
  ${props => (props.active && css`
   animation: ${boxFade} 2s 1s infinite linear alternate;
  `)}
`

const InputPw = styled.input`

`
export default TeamRoomCard