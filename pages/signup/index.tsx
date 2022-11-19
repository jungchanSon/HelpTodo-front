/* eslint-disable react-hooks/rules-of-hooks */
import {NextPage} from "next";
import styled from "styled-components";
import axios from "axios";
import {useState} from "react";
import {useSession} from "next-auth/react";

const signupPage = () => {
  //TODO : usestate로 validation 즉각 피드백 주기
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const {data: session} = useSession();

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

        axios.post(process.env.NEXT_PUBLIC_LOCALURL_BACK+"/members/signup", null, {params: signupData} ).then((res)=>{
          console.log(res)
          console.log(res.data)
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
          <InputName placeholder={"이름"} className={"p-3 m-2"} name={"name"}
                     value={name} onChange={(e)=>{setName(e.currentTarget.value)}} />
          <InputId placeholder={"ID"} type={"text"} className={"p-3 m-2"} name={"id"}
                   value={id} onChange={(e)=>{setId(e.currentTarget.value)}} />
          <InputPw placeholder={"PASSWORD"} type={"password"} className={"p-3 m-2"} name={"pw"}
                   value={pw} onChange={(e)=>{setPw(e.currentTarget.value)}} />
          <InputPw placeholder={"PASSWORD 확인"} type={"password"} className={"p-3 m-2"} name={"pw2"}
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