import {NextPage} from "next";
import styled from "styled-components";
import React from "react";

const teamcodePage:NextPage = () => {
  return(
      <>
        <LayoutContainer>

          <InputTeamCode>
            팀 초대 코드 입력
            <FormCode>
              <InputCode type="text"/>

              <SubmitCode type="submit"/>
            </FormCode>
          </InputTeamCode>
        </LayoutContainer>
      </>
  )
}
const LayoutContainer = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
`

const InputTeamCode = styled.div`
      border: 1px solid black;
      margin: 5vh;
      padding: 4vh;
`
const FormCode = styled.form`
  
`
const InputCode = styled.input`

`
const SubmitCode = styled.input`

`
export default teamcodePage