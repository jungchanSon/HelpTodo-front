import React from 'react';
import styled from "styled-components";

export default function Home() {
  return (
      <div>
            <TeamlistContainer>
                  <InputTeamCode>
                        팀 초대 코드 입력
                    <FormCode>
                      <InputCode type="text"/>

                      <SubmitCode type="submit"/>
                    </FormCode>
                  </InputTeamCode>
                  <TeamList className={""} >
                        내 팀 목록
                  </TeamList>
            </TeamlistContainer>
      </div>
  )
}

const TeamlistContainer = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
`


const InputTeamCode = styled.div`
      border: 1px solid black;
      margin: 5vh;
      padding: 4vh;
`
const TeamList = styled.h1`
      border: 1px solid red;
      margin: 5vh;
      padding: 4vh;

`
const H1 = styled.h1`

`

const H2 = styled.h2`
    margin-left: 2vw;
`

const FormCode = styled.form`
  
`
const InputCode = styled.input`

`
const SubmitCode = styled.input`

`