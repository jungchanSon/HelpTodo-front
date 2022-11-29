import {NextPage} from "next";
import styled from "styled-components";
import axios from "axios";
import {useSession} from "next-auth/react";
import roomList from "../../store/roomList";
import roomList from "../../store/roomList";

const myteamPage:NextPage = () => {

  const {data: session} = useSession();


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