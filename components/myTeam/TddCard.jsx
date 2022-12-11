import {useEffect, useRef, useState} from "react";
import axios from "axios";
import styled from "styled-components";
import userStore from "../../store/user";
import roomData from "../../store/roomData";
import todoStore from "../../store/todoStore";

const TddCard = ({ttdData, parent}) => {
  const {userId, userName, setUserName, setUserId} = userStore();
  const {roomName, roomCreator, roomCreateDate} = roomData()
  const {todoDatas, setTodoDatas} = todoStore()

  const [detail, setDetail] = useState()

  useEffect(()=>{
    console.log(ttdData)

    setDetail(ttdData)
  }, [])

  const clickDeleteTdd = (e) => {

    const data = {
      tddId: ttdData.tddId
    }
    axios.delete(process.env.NEXT_PUBLIC_LOCALURL_BACK+"/todolist/tdd/delete", {params: data}).then((res) =>{
      const reqData = {
        userId: userId,
        teamName: roomName
      }
      axios.post(process.env.NEXT_PUBLIC_LOCALURL_BACK+"/todolist/all", null, {params : reqData}).then((res)=>{
        console.log("all", res.data)

        setTodoDatas(res.data)
      })
    })

  }

  return (
      <TddDiv>
        {
          detail ?
              <div className={"card border-dark m-3"} style={{}}>
                <div className={"card-header"}> {detail.createDate.slice(0, 10)} </div>
                <div className={"card-body text-dark"}>
                  <p className={"card-text"}>{detail.content}</p>
                </div>
                <button type="button" className="btn btn-danger" onClick={clickDeleteTdd}>삭제</button>
              </div> : null
        }
      </TddDiv>
  )
}
const TddDiv = styled.div`
  width: 100%;
`

export default TddCard