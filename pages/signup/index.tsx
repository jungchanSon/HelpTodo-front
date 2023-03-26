/* eslint-disable react-hooks/rules-of-hooks */
import {NextPage} from "next";
import styled from "styled-components";
import axios from "axios";
import {useState} from "react";
import Router from "next/router";

const signupPage = () => {
  //TODO : usestate로 validation 즉각 피드백 주기
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const id = e.target.id.value;
    const pw = e.target.pw.value;
    const pw2 = e.target.pw2.value;

    if( name && id && pw && pw2){ //모두 입력한 상태
      if(pw == pw2){
        const signupData = {
          name: name,
          id: id,
          pw: pw
        }

        axios.post(process.env.NEXT_PUBLIC_SIGNUP, null, {params: signupData} ).then((res)=>{
          Router.push("/login")
        })
      } else{ // pw != pw2
        alert("패스워드 확인이 틀렸습니다.")
      }
    }else{  //빈 칸 있음.
      alert("모두 입력해주세요")
    }
  }
  return(
      <div>
        <FormSignUp className={"loginForm"} onSubmit={handleSubmit}>
          <div className="input-group mb-4" style={{height: "50px"}}>
            <span className="input-group-text"
                  id="inputGroup-sizing-default">이름</span>
            <input type="text" className="form-control"
                   aria-label="Sizing example input"
                   aria-describedby="inputGroup-sizing-default"
                   placeholder={"이름"}
                   onChange={(e)=>{setName(e.currentTarget.value)}}
                   name={"name"}
                   value={name}
                   style={{fontSize: "1.5em"}} />
          </div>
          {/*<InputName placeholder={"이름"} className={"p-3 m-2"} name={"name"}*/}
          {/*           value={name} onChange={(e)=>{setName(e.currentTarget.value)}} />*/}

          <div className="input-group mb-3" style={{height: "50px"}}>
            <span className="input-group-text"
                  id="inputGroup-sizing-default">아이디</span>
            <input type="text" className="form-control"
                   aria-label="Sizing example input"
                   aria-describedby="inputGroup-sizing-default"
                   placeholder={"ID"}
                   onChange={(e)=>{setId(e.currentTarget.value)}}
                   name={"id"}
                   value={id}
                   style={{fontSize: "1.5em"}}/>
          </div>
          {/*<InputId placeholder={"ID"} type={"text"} className={"p-3 m-2"} name={"id"}*/}
          {/*         value={id} onChange={(e)=>{setId(e.currentTarget.value)}} />*/}

          <div className="input-group mb-3" style={{height: "50px"}}>
            <span className="input-group-text"
                  id="inputGroup-sizing-default">비밀번호</span>
            <input type="password" className="form-control"
                   aria-label="Sizing example input"
                   aria-describedby="inputGroup-sizing-default"
                   placeholder={"PASSWORD"}
                   onChange={(e)=>{setPw(e.currentTarget.value)}}
                   name={"pw"}
                   value={pw}
                   style={{fontSize: "1.5em"}}/>
          </div>
          {/*<InputPw placeholder={"PASSWORD"} type={"password"} className={"p-3 m-2"} name={"pw"}*/}
          {/*         value={pw} onChange={(e)=>{setPw(e.currentTarget.value)}} />*/}

          <div className="input-group mb-3" style={{height: "50px"}}>
            <span className="input-group-text"
                  id="inputGroup-sizing-default">비밀번호</span>
            <input type="password" className="form-control"
                   aria-label="Sizing example input"
                   aria-describedby="inputGroup-sizing-default"
                   placeholder={"PASSWORD 확인"}
                   onChange={(e)=>{setPw2(e.currentTarget.value)}}
                   name={"pw2"}
                   value={pw2}
                   style={{fontSize: "1.5em"}}/>
          </div>
          {/*<InputPw placeholder={"PASSWORD 확인"} type={"password"} className={"p-3 m-2"} name={"pw2"}*/}
          {/*         value={pw2} onChange={(e)=>{setPw2(e.currentTarget.value)}} />*/}
            <button type="submit" className="btn btn-outline-dark">회원가입</button>

        </FormSignUp>
      </div>
  )
}

const FormSignUp = styled.form`
  display: flex;
  flex-direction: column;
  border: 2px solid black;
  border-radius: 10px;
  margin: 10vh 30vw;
  padding: 3vh;
  justify-content: center;
`
const InputName = styled.input``
const InputId = styled.input``
const InputPw = styled.input``
const SubmitSignUp = styled.input``

const Layout = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 3vh 0;
`
export default signupPage;