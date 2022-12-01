import {NextPage} from "next";
import styled from "styled-components";
import axios from "axios";
import {useSession} from "next-auth/react";
import roomData from "../../store/roomData";
import TodoList from '../../components/myTeam/TodoList'
import Router from "next/router";
import {useEffect, useState} from "react";

const MyteamPage:NextPage = () => {

  const [tddData, setTddData] = useState()
  const {data: session} = useSession();
  const {roomName, roomCreator, roomCreateDate} = roomData()
  const userId = session.token.token.user.id

  useEffect(()=>{

    const createRoomData = {
      userId: userId,
      teamName: roomName
    }
    console.log(createRoomData)

    axios.post(process.env.NEXT_PUBLIC_LOCALURL_BACK+"/todolist/all", null, {params : createRoomData}).then((res)=>{
      console.log(res.data)
      setTddData(res.data)
    })

  }, []);




  console.log(roomName);
  console.log(roomCreator);
  console.log(roomCreateDate);



  const clickAddTodoList = (e) => {
    e.preventDefault()

    const createRoomData = {
      title: e.target.inputRoomName.value,
      userId: userId,
      teamName: roomName
    }
    console.log(createRoomData)
    axios.post(process.env.NEXT_PUBLIC_LOCALURL_BACK+"/todolist/create", null, {params : createRoomData}).then((res)=>{

      console.log(res.data)
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
              <form onSubmit={clickAddTodoList} >
                <input type="text" name={"inputRoomName"} />
                투두리스트 <button type="submit" className="btn btn-outline-success" >투두리스트 추가</button>
              </form>
            </h1>
            {
              tddData ?
                  tddData.map((item, key) => (
                    <TodoList
                        key={key}
                        resTodo ={item.resTodos}
                        resDoing={item.resDoings}
                        resDone={item.resDones}
                    ></TodoList>
                  ))
                  : console.log("NONE")
            }
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

export default MyteamPage