import {NextPage} from "next";
import styled from "styled-components";
import axios from "axios";
import {useSession} from "next-auth/react";
import roomData from "../../store/roomData";
import TodoList from '../../components/myTeam/TodoList'
import Router from "next/router";
const myteamPage:NextPage = () => {

  const {data: session} = useSession();
  const {roomName, roomCreator, roomCreateDate} = roomData()

  console.log(roomName);
  console.log(roomCreator);
  console.log(roomCreateDate);

  const clickAddTodoList = () => {
    axios.post(process.env.NEXT_PUBLIC_LOCALURL_BACK+"/members/signup", null, {params: signupData} ).then((res)=>{
      Router.push("/login")
    })

  }

  // if(!session){
  //   return(
  //       <RequestLogin />
  //   )
  // } else
  return(
      <div>
        <h3>방 이름 : {roomName}</h3>
        <h4>방장 : {roomCreator}</h4>
        <h5>방 생성일 : {roomCreateDate}</h5>
        <GridLayout>
          <Div>
            <h1>팀 목록</h1>
            <h1>투두리스트 목록</h1>
            <h1>채팅방 가기?</h1>
          </Div>
          <Div>
            <h1>
              투두리스트 <button type="button" className="btn btn-outline-success" onClick={clickAddTodoList} >투두리스트 추가</button>

            </h1>

            <TodoList></TodoList>
          </Div>
          <Div>
            <h1>파일 공유 칸</h1>
          </Div>
        </GridLayout>
      </div>
  )
}

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;

  border: 1px solid black;
  margin: 3em 0; 
`
const Div = styled.div`
  border: 1px solid black;
  
`

export default myteamPage