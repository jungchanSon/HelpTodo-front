import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button'
import axios from "axios";
import Router from "next/router";
import {useSession} from "next-auth/react";
import styled from "styled-components";
import userStore from "../../store/user";
const AddTddForm = (props) => {

  const {userId, userName, setUserName, setUserId} = userStore();

  const submitAddTdd = (e) => {
    e.preventDefault()

    const content = e.target.todoContent.value

    const addTddData = {
      content: content,
      todoListId: props.todolistId,
      importance: 0,
      memberId: userId
    }
    console.log(addTddData)
    if(props.title === "todo"){

      axios.post(process.env.NEXT_PUBLIC_LOCALURL_BACK+"/todolist/addTDD/"+"todo", null, {params: addTddData} ).then((res)=>{
        console.log(res.data)
      })
    }else if(props.title === "doing"){

      axios.post(process.env.NEXT_PUBLIC_LOCALURL_BACK+"/todolist/addTDD/"+"doing", null, {params: addTddData} ).then((res)=>{
        console.log(res.data)
      })
    }else if(props.title === "done"){

      axios.post(process.env.NEXT_PUBLIC_LOCALURL_BACK+"/todolist/addTDD/"+"done", null, {params: addTddData} ).then((res)=>{
        console.log(res.data)

      })
    }





  }
  return(
      <>
          <DropdownButton style={{display: "inline-block"}} variant="outline-success" title={props.title + " 추가하기"}>
            <Form onSubmit={submitAddTdd}>
              <input type="text" placeholder={"내용"} name={"todoContent"} className={"mb-3"}/>
              <Button variant="outline-secondary" type={"submit"}>추가하기</Button>
            </Form>
          </DropdownButton>
      </>
  )
}

const Form = styled.form`
  text-align: center;
`

export default AddTddForm