import {NextPage} from "next";
import styled from "styled-components";
import axios from "axios";
import {useSession} from "next-auth/react";
import roomData from "../../store/roomData";
import todoStore from "../../store/todoStore"
import doingStore from "../../store/doingStore"
import doneStore from "../../store/doneStore"
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

  const {todoDatas, setTodoDatas} = todoStore()
  const {doingDatas, setDoingDatas} = doingStore()
  const {doneDatas, setDoneDatas} = doneStore()
  const {} = doingStore()
  const {} = doneStore()

  useEffect(()=>{

    const reqData = {
      userId: userId,
      teamName: roomName
    }
    console.log(reqData)

    axios.post(process.env.NEXT_PUBLIC_LOCALURL_BACK+"/todolist/all", null, {params : reqData}).then((res)=>{
      console.log("all", res.data)

      setTodoDatas(res.data)
      setTddData(res.data)

    })
    console.log("tdds", todoDatas)
    console.log("tdds", doingDatas)
    console.log("tdds", doneDatas)

  }, []);

  // useEffect(()=>{
  //   const reqData = {
  //     userId: userId,
  //     teamName: roomName
  //   }
  //
  //   axios.post(process.env.NEXT_PUBLIC_LOCALURL_BACK+"/todolist/all", null, {params : reqData}).then((res)=>{
  //     console.log("re", res.data)
  //
  //     setTodoDatas(res.data)
  //     setTddData(res.data)
  //   })
  // }, [todoDatas]);

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

      const reqData = {
        userId: userId,
        teamName: roomName
      }
      console.log(reqData)

      axios.post(process.env.NEXT_PUBLIC_LOCALURL_BACK+"/todolist/all", null, {params : reqData}).then((res)=>{
        console.log("all", res.data)

        setTddData(res.data)
        setTodoDatas(res.data)
      })
    })
  }
  //????????????


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
              <h4><b>??? ??????</b></h4>
              <h5>{roomName}</h5> <hr />
              <h4><b>??????</b></h4>
              <h5>{roomCreator}</h5> <hr/>
              <h4><b>??? ?????????</b> </h4>
              <h5>{roomCreateDate?roomCreateDate.slice(0,10):null}</h5> <hr/>
              <h5><b>??? ??????</b></h5>
              <hr/>
              <h5><b>??????????????? ??????</b></h5>
              <hr/>

            </RoomInfo>
          </Div>
          <Div>
            <h1 style={{textAlign: "center"}} className={"py-3"}>
              <form onSubmit={clickAddTodoList} >
                <input type="text" name={"inputRoomName"} className={"mx-3"} placeholder = "??????????????? ??????"/>
                <button type="submit" className="btn btn-outline-success mx-3" >??????????????? ??????</button>
              </form>
              <hr/>
            </h1>
            {
              todoDatas ?
                  todoDatas.map((item, key) => (
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
          {/*  <h1>?????? ?????? ???</h1>*/}
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