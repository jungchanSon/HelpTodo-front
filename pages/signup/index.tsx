/* eslint-disable react-hooks/rules-of-hooks */
import {NextPage} from "next";
import styled from "styled-components";
import axios from "axios";
import {useState} from "react";

const signupPage = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  // axios.post(process.env.NEXT_PUBLIC_LOCALURL_BACK+"/members/signup", ).then((res)=>{
  //
  // })
  const handleSubmit = (e) => {
    e.preventDefault();

    if( name && id && pw && pw2){ //모두 입력한 상태
      if(pw == pw2){
        const loginData = {
          name: name,
          id: id,
          pw: pw
        }

        axios.post(process.env.NEXT_PUBLIC_LOCALURL_BACK+"/members/signup", null, {params: loginData} ).then((res)=>{
          console.log(res)
          console.log(res.data)
        })
      } else{

      }
    }else{  //빈 칸 있음.
      console.log("not")
    }




  }


  return(
      <div>
        <FormSignUp className={"loginForm"} onSubmit={handleSubmit}>
          <InputName placeholder={"이름"} className={"p-3 m-2"}
                     value={name} onChange={(e)=>{setName(e.currentTarget.value)}} />
          <InputId placeholder={"ID"} type={"text"} className={"p-3 m-2"}
                   value={id} onChange={(e)=>{setId(e.currentTarget.value)}} />
          <InputPw placeholder={"PASSWORD"} type={"password"} className={"p-3 m-2"}
                   value={pw} onChange={(e)=>{setPw(e.currentTarget.value)}} />
          <InputPw placeholder={"PASSWORD 확인"} type={"password"} className={"p-3 m-2"}
                   value={pw2} onChange={(e)=>{setPw2(e.currentTarget.value)}} />
          <SubmitSignUp type={"submit"} className={"p-3 m-2"}></SubmitSignUp>
        </FormSignUp>
      </div>
  )
}

const FormSignUp = styled.form``
const InputName = styled.input``
const InputId = styled.input``
const InputPw = styled.input``
const SubmitSignUp = styled.input``
export default signupPage;