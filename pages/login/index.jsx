/* eslint-disable react-hooks/rules-of-hooks */
import styled from "styled-components";
import Link from "next/link";
import {useState} from "react";
import axios from "axios";
import userStore from "/store/user"

const loginPage= () => {
  const [id, setId] = useState("")
  const [pw, setPw] = useState("")

  const {userName, setUserName} = userStore()

  const handleInput = (e) => {
    const name = e.target.name;
      if(name == "id"){
        setId(e.target.value)
      }else if(name == "pw"){
        setPw(e.target.value)
      }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const loginData = {
      id: id,
      pw: pw
    }

    axios.post(process.env.NEXT_PUBLIC_LOCALURL_BACK+"/members/login", null, {params: loginData} ).then((res)=>{
      setUserName(res.data)
    })
  }
  return(
      <Div>
        <FormLogin className={"loginForm"} onSubmit={handleSubmit}>
          <InputId type="text" placeholder={"ID"} className={"p-3 hover:border-4 hover:bg-gray-100 m-2"} name={"id"}
                   onChange={handleInput}></InputId>
          <InputPw type="password" placeholder={"PASSWORD"} className={"p-3 hover:border-4 hover:bg-gray-100 m-2"} name={"pw"}
                   onChange={handleInput}></InputPw>

          <SubmitLogin type="submit"  className={"p-3 m-2"} value={"로그인"}></SubmitLogin>
          <Link href={"/signup"} className={"text-center m-2"}>
            <Psignup className={"text-center p-3 bg-rose-100"}>회원가입</Psignup>
          </Link>
        </FormLogin>
      </Div>




  )
};
const Div = styled.div`
  
`
const FormLogin = styled.form`
`
const InputId = styled.input` 
  
`

const InputPw = styled.input`

`

const SubmitLogin = styled.input`
  
`
const Psignup = styled.p`
  border: 1px solid black;
`
export default loginPage;