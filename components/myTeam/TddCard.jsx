import {useEffect, useRef, useState} from "react";
import axios from "axios";
import styled from "styled-components";

const TddCard = ({ttdData, parent}) => {

  const [detail, setDetail] = useState()
  const tddRef = useRef()

  var parentNode = null;

  if(parent){
    console.log(parent)
  }
  useEffect(()=>{
    console.log(ttdData)

    setDetail(ttdData)
  }, [])

  const clickDeleteTdd = (e) => {

    const data = {
      tddId: ttdData.tddId
    }
    axios.delete(process.env.NEXT_PUBLIC_LOCALURL_BACK+"/todolist/tdd/delete", {params: data}).then((res) =>{
      console.log(res.data)
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