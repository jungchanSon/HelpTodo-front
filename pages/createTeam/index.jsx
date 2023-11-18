import styled from 'styled-components'
import React, { useEffect } from 'react'
import axios from 'axios'
import Router from 'next/router'
import userStore from '../../store/userStore'
import { useCookies } from 'react-cookie'

const TeamcodePage = () => {
    const { userName } = userStore()
    const [cookie, setCookie, removeCookie] = useCookies(['token'])

    useEffect(() => {
        if (!cookie.token || !userName) {
            Router.push('/login')
        }
    }, [])

    const submitCreateTeam = (e) => {
        e.preventDefault()

        const teamName = e.target.teamName.value
        const teamPW = e.target.teamPw.value

        const createTeamData = {
            token: cookie.token,
            teamName: teamName,
            teamPassword: teamPW,
        }

        axios
            .post(process.env.NEXT_PUBLIC_CREATE_TEAM, null, {
                params: createTeamData,
            })
            .then((res) => {
                if (res.status === 200) {
                    Router.push('/teamlist')
                }
            })
    }

    // if(!session){
    //   return(
    //       <RequestLogin />
    //   )
    // } else
    return (
        <>
            <LayoutContainer>
                <InputTeamCode>
                    <h3>팀 생성 하기</h3>
                    <hr />
                    <br />
                    <FormCode onSubmit={submitCreateTeam}>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">
                                팀 이름
                            </span>
                            <input
                                className="form-control"
                                type="text"
                                placeholder={'팀 이름'}
                                name={'teamName'}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">
                                팀 패스워드
                            </span>
                            <input
                                className="form-control"
                                type="text"
                                placeholder={'팀 비밀번호'}
                                name={'teamPw'}
                            />
                        </div>

                        <button type="submit" className="btn btn-outline-success">
                            팀 생성하기
                        </button>
                        {/*<InputCode type="text" placeholder={"팀 이름"} name={"teamName"}/> <br/>*/}
                        {/*<InputCode type="text" placeholder={"팀 비번"} name={"teamPw"}/> <br/>*/}
                        {/*<SubmitCode type="submit" value={"팀 생성하기"}/>*/}
                    </FormCode>
                </InputTeamCode>
                {/*<InputTeamCode>*/}
                {/*    <h3>팀 초대 코드로 들어가기</h3>*/}
                {/*    <hr />*/}
                {/*    <br />*/}
                {/*    <FormCode>*/}
                {/*        <div className='input-group mb-3'>*/}
                {/*            <span className='input-group-text' id='inputGroup-sizing-default'>*/}
                {/*                팀 패스워드*/}
                {/*            </span>*/}
                {/*            <input className='form-control' type='text' placeholder={'팀 코드'} />*/}
                {/*        </div>*/}
                {/*        <button type='submit' className='btn btn-outline-success'>*/}
                {/*            팀 가입하기*/}
                {/*        </button>*/}
                {/*        /!*<InputCode type="text" placeholder={"팀 코드"}/><br/>*!/*/}
                {/*        /!*<SubmitCode type="submit" value={"팀 가입하기"}/>*!/*/}
                {/*    </FormCode>*/}
                {/*</InputTeamCode>*/}
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
    text-align: center;
    border: 1px solid black;
    margin: 5vh;
    padding: 4vh;
`

const FormCode = styled.form``

const InputCode = styled.input``

const SubmitCode = styled.input``

export default TeamcodePage
