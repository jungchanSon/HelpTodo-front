import {NextPage} from "next";
import styled from "styled-components";

const signupPage:NextPage = () => {
  return(
      <div>
        <FormSignUp className={"loginForm"}>
          <InputName placeholder={"이름"} className={"p-3 m-2"}></InputName>
          <InputId placeholder={"ID"} type={"text"} className={"p-3 m-2"}></InputId>
          <InputPw placeholder={"PASSWORD"} type={"password"} className={"p-3 m-2"}></InputPw>
          <InputPw placeholder={"PASSWORD 확인"} type={"password"} className={"p-3 m-2"}></InputPw>
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