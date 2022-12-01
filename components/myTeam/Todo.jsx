import {useEffect, useState} from "react";

const Todo = ({ttdData}) => {

  const [detail, setDetail] = useState()

  useEffect(()=>{
    setDetail(ttdData)
  }, [])

  return (
      <>
        <h1>Todo</h1>
        {
          detail ?
              <div className={"card border-dark mb-3"} style={{maxWidth: "18rem"}}>
                <div className={"card-header"}> {detail.createDate} </div>
                <div className={"card-body text-dark"}>
                  <h5 className={"card-title"}>Dark card title</h5>
                  <p className={"card-text"}>{detail.content}</p>
                </div>
                <div className={"card-footer"}>삭제하기</div>
              </div> : null
        }
      </>
  )
}

export default Todo