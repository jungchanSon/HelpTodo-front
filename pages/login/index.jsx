/* eslint-disable react-hooks/rules-of-hooks */
import styled from "styled-components";
import Link from "next/link";
import {useEffect, useState} from "react";
import userStore from "/store/user"
import Router from "next/router";
import axios from "axios";
import {useCookies} from "react-cookie";

const LoginPage= () => {
  const {userName, setUserName} = userStore();
  const [cookie, setCookie, removeCookie] = useCookies(['id']);
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

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    const input_id = e.target.id.value;
    const input_pw = e.target.pw.value;

    const loginData = {
      id: input_id,
      pw: input_pw
    }
    const coo = {
      Authorization: "Bearer "+ cookie.id
    }
    axios.post(process.env.NEXT_PUBLIC_LOGIN,null,{params: loginData}).then((res)=> {
      setCookie('token', res.data.token)

      axios.defaults.headers.common['Authorization'] = cookie.token //or res.data 등...
      setUserName(res.data.memberName)
      console.log(userName)
    })
  }

  return(
      <Div>
        <FormLogin className={"loginForm"} onSubmit={handleLoginSubmit}>

          <div class="input-group mb-4" style={{height: "50px"}}>
            <span class="input-group-text"
                  id="inputGroup-sizing-default">아이디</span>
            <input type="text" className="form-control"
                   aria-label="Sizing example input"
                   aria-describedby="inputGroup-sizing-default"
                   placeholder={"ID"}
                   onChange={handleInput}
                   name={"id"}
                   style={{fontSize: "1.5em"}}/>
          </div>

          <div class="input-group mb-3" style={{height: "50px"}}>
            <span class="input-group-text"
                  id="inputGroup-sizing-default">비밀번호</span>
            <input type="password" className="form-control"
                   aria-label="Sizing example input"
                   aria-describedby="inputGroup-sizing-default"
                   placeholder={"PW"}
                   onChange={handleInput}
                   name={"pw"}
                   style={{fontSize: "1.5em"}}/>
          </div>
          <Layout>
            <button type="submit" className="btn btn-outline-dark">로그인</button>
            <Link href={"/signup"}>
              <button type="button"
                      className="btn btn-outline-secondary">회원가입
              </button>
            </Link>
          </Layout>
          {/*<input className="btn btn-primary" type="submit" value="로그인" />*/}
          {/*<Link href={"/signup"} className={"text-center m-2"}>*/}
          {/*  <Psignup className={"text-center p-3 bg-rose-100"}>회원가입</Psignup>*/}
          {/*</Link>*/}
        </FormLogin>
      </Div>




  )
};
const Div = styled.div`
  
`
const FormLogin = styled.form`
  border: 2px solid black;
  border-radius: 10px;
  margin: 10vh 30vw;
  padding: 3vh
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

const Layout = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 3vh 0;
`
export default LoginPage;