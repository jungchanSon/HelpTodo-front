import {NextPage} from "next";
import styled from "styled-components";
import axios from "axios";
import {useSession} from "next-auth/react";
import roomList from "../../store/roomList";
import myRoomList from "../../store/myRoomList";

const myteamPage:NextPage = () => {

  const {data: session} = useSession();
  const {rooms, setRooms} = roomList()
  const {myRooms, setMyRooms} = myRoomList()

  axios.get(process.env.NEXT_PUBLIC_LOCALURL_BACK+"/team/findTeamList",null).then((res)=>{
    console.log("getRooms")
    console.log(res.data)
    setRooms(res.data)
    console.log("rooms", rooms)
  }).catch((e) => {

    console.log(e)
  })

  axios.get(process.env.NEXT_PUBLIC_LOCALURL_BACK+"/team/findMyTeam",null).then((res)=>{
    console.log("getMyRooms")
    console.log(res.data)
    setMyRooms(res.data)
    console.log("myRooms", myRooms)

  }).catch((e) => {

    console.log(e)
  })

  // if(!session){
  //   return(
  //       <RequestLogin />
  //   )
  // } else
  return(
      <div>
        <GridLayout >
          <Div>
            <h1>팀 목록</h1>
            <h1>투두리스트 목록</h1>
            <h1>채팅방 가기?</h1>
          </Div>
          <Div>
            <h1>투두리스트</h1>
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