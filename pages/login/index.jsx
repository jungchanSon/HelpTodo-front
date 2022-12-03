/* eslint-disable react-hooks/rules-of-hooks */
import styled from "styled-components";
import Link from "next/link";
import {useEffect, useState} from "react";
import userStore from "/store/user"
import { useSession, signIn, signOut } from "next-auth/react"
import {redirect} from "next/navigation";
import Router from "next/router";

const loginPage= () => {
  const {data: session} = useSession();
  const {userId, userName, setUserName, setUserId} = userStore();
  const [id, setId] = useState("")
  const [pw, setPw] = useState("")


  const handleInput = (e) => {
    const name = e.target.name;
      if(name == "id"){
        setId(e.target.value)
      }else if(name == "pw"){
        setPw(e.target.value)
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = e.target.id.value;
    const pw = e.target.pw.value;
    console.log(id, pw)

    const response = await signIn("id-password-credential", {
      id: id,
      password: pw,
      redirect: false,
      callbackUrl: "http://localhost:3000/"
    });

    if(response.ok){

      await setUserId(id)

      await console.log("id", userId)

      Router.push('/')
    }
  }
  if (session) {
    if( userName <= 0){
      setUserName(session.session.user.name)
      console.log(session)
      console.log("session.token.token.user.id", session.token.token.user.id)
    }
    return (
        <>
          <h2>{userName}님 이미 로그인하셨습니다.</h2>
        </>
    )
  } else{
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




  )}
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