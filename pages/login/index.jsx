import styled from "styled-components";
import Link from "next/link";

const loginPage= () => {
  return(
      <Div>
        <FormLogin className={"loginForm"}>
          <InputId type="text" placeholder={"ID"} className={"p-3 hover:border-4 hover:bg-gray-100 m-2"}></InputId>
          <InputPw type="password" placeholder={"PASSWORD"} className={"p-3 hover:border-4 hover:bg-gray-100 m-2" }></InputPw>

          <SubmitLogin type="submit"  className={"p-3 m-2"} value={"로그인"}></SubmitLogin>
          <Link href={"/"} className={"text-center m-2"}>
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