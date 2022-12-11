import {NextPage} from "next";
import styled from "styled-components";
import axios from "axios";
import {useSession} from "next-auth/react";
import roomData from "../../store/roomData";
import TodoList from '../../components/myTeam/TodoList'
import LeftMenu from '../../components/myTeam/LeftMenu'
import Router from "next/router";
import {useEffect, useState} from "react";
import {LeftRightDialogHeader} from "next/dist/client/components/react-dev-overlay/internal/components/LeftRightDialogHeader";
import userStore from "../../store/user";

const MyteamPage:NextPage = () => {

  const {userId, userName, setUserName, setUserId} = userStore();
  const [tddData, setTddData] = useState()
  const {roomName, roomCreator, roomCreateDate} = roomData()


  useEffect(()=>{

    const createRoomData = {
      userId: userId,
      teamName: roomName
    }
    console.log(createRoomData)

    axios.post(process.env.NEXT_PUBLIC_LOCALURL_BACK+"/todolist/all", null, {params : createRoomData}).then((res)=>{
      console.log("all", res.data)
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

  //테스트용


  // if(!session){
  //   return(
  //       <RequestLogin />
  //   )
  // } else
  return(
      <div>
        <GridLayout>
          <Div>

            <RoomInfo>
              <h4><b>팀 이름</b></h4>
              <h5>{roomName}</h5> <hr />
              <h4><b>팀장</b></h4>
              <h5>{roomCreator}</h5> <hr/>
              <h4><b>방 생성일</b> </h4>
              <h5>{roomCreateDate.slice(0,10)}</h5> <hr/>
              <h5><b>팀 목록</b></h5>
              <hr/>
              <h5><b>투두리스트 목록</b></h5>
              <hr/>

            </RoomInfo>
          </Div>
          <Div>
            <h1 style={{textAlign: "center"}} className={"py-3"}>
              <form onSubmit={clickAddTodoList} >
                <input type="text" name={"inputRoomName"} className={"mx-3"} placeholder = "투두리스트 이름"/>
                <button type="submit" className="btn btn-outline-success mx-3" >투두리스트 추가</button>
              </form>
              <hr/>
            </h1>
            {
              tddData ?
                  tddData.map((item, key) => (
                    <TodoList
                        key={key}
                        todolistId={item.id}
                        title = {item.title}
                        creator = {item.creator}
                        resTodo ={item.resTodos}
                        resDoing={item.resDoings}
                        resDone={item.resDones}
                    ></TodoList>
                  ))
                  : console.log("NONE")
            }
          </Div>
          {/*<Div>*/}
          {/*  <h1>파일 공유 칸</h1>*/}
          {/*</Div>*/}
        </GridLayout>
      </div>
  )
}

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr;

  border: 1px solid black;
  margin: 3em 0; 
`
const Div = styled.div`
  border: 1px solid black;
  
`
const RoomInfo = styled.div`
  padding: 5px;
  text-align: center;
`
export default MyteamPage