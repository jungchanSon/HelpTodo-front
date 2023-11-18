import { NextPage } from 'next'
import styled from 'styled-components'
import axios from 'axios'
import roomData from '../../store/roomData'
import todoTableStore from '../../store/todoTableStore'
import doingStore from '../../store/doingStore'
import doneStore from '../../store/doneStore'
import TodoList from '../../components/myTeam/TodoList'
import { useEffect, useRef, useState } from 'react'
import userStore from '../../store/userStore'
import { useCookies } from 'react-cookie'
import todoStore from '../../store/todoStore'
import roomList from '../../store/roomList'
import Router from 'next/router'
import { EventSourcePolyfill } from 'event-source-polyfill'

const MyteamPage = () => {
    const { userId, userName, setUserName, setUserId } = userStore()
    const [tableData, setTableData] = useState([])
    const [cookie] = useCookies(['token'])
    const { teamName, teamCreator, teamCreateDate } = roomData()
    const { todoTableData, setTodoTableData } = todoTableStore()
    const { myTeams } = roomList()
    const [myMembers, setMyMembers] = useState([])

    useEffect(() => {
        if (!cookie.token || !userName) {
            Router.push('/login')
        }
        //----------------------------------------------------------
        const sseForUpdate = new EventSourcePolyfill(
            `${process.env.NEXT_PUBLIC_LOCALURL_BACK}/event/addEmitter?teamName=${teamName}`,
            {
                headers: {
                    Authorization: `Bearer ${cookie.token}`,
                },
            },
        )

        sseForUpdate.addEventListener('updateTodoList', () => {
            const reqData = {
                teamName: teamName,
            }

            axios
                .post(process.env.NEXT_PUBLIC_ALL_TODOLIST, null, {
                    params: reqData,
                    headers: {
                        Authorization: `Bearer ${cookie.token}`,
                    },
                })
                .then((res) => {
                    setTodoTableData(res.data)
                    setTableData(res.data)
                })
        })
        //----------------------------------------------------------

        const reqData = {
            teamName: teamName,
        }

        axios
            .post(process.env.NEXT_PUBLIC_ALL_TODOLIST, null, {
                params: reqData,
                headers: {
                    Authorization: 'Bearer ' + cookie.token,
                },
            })
            .then((res) => {
                setTodoTableData(res.data)
                setTableData(res.data)
            })

        axios
            .post(process.env.NEXT_PUBLIC_FIND_MY_MEMBERS, null, {
                params: reqData,
                headers: {
                    Authorization: 'Bearer ' + cookie.token,
                },
            })
            .then((res) => {
                setMyMembers(res.data)
            })
    }, [])

    const clickAddTodoList = (e) => {
        e.preventDefault()

        const createRoomData = {
            title: e.target.inputRoomName.value,
            to: userId,
            teamName: teamName,
        }
        axios
            .post(process.env.NEXT_PUBLIC_CREATE_TODOLIST, null, {
                params: createRoomData,
                headers: {
                    Authorization: 'Bearer ' + cookie.token,
                },
            })
            .then((res) => {
                const reqData = {
                    userId: userId,
                    teamName: teamName,
                }

                axios
                    .post(process.env.NEXT_PUBLIC_ALL_TODOLIST, null, {
                        params: reqData,
                        headers: {
                            Authorization: 'Bearer ' + cookie.token,
                        },
                    })
                    .then((res) => {
                        setTodoTableData(res.data)
                    })
            })
    }
    //테스트용

    // if(!session){
    //   return(
    //       <RequestLogin />
    //   )
    // } else
    const moveToOtherTeam = (teamName) => {
        const reqData = {
            teamName: teamName,
        }
        axios
            .post(process.env.NEXT_PUBLIC_ALL_TODOLIST, null, {
                params: reqData,
                headers: {
                    Authorization: 'Bearer ' + cookie.token,
                },
            })
            .then((res) => {
                setTodoTableData(res.data)
                setTableData(res.data)
                // setTodoData()
                // setDoingData()
                // setDoneData()
            })
    }
    if (!todoTableData) {
        return null
    }
    return (
        <>
            <GridLayout>
                <Div>
                    <RoomInfo>
                        <h4>
                            <b>팀 이름</b>
                        </h4>
                        <h5>{teamName}</h5>
                        <hr />
                        <h4>
                            <b>팀장</b>
                            {}
                        </h4>
                        <h5>{teamCreator}</h5>
                        <hr />
                        <h4>
                            <b>방 생성일</b>
                        </h4>
                        <h5>{teamCreateDate ? teamCreateDate.slice(0, 10) : null}</h5>
                        <hr />
                        <h4>
                            <b>팀원들</b>
                            {myMembers
                                ? myMembers.map((item, key) => <div key={key}>{item}</div>)
                                : null}
                        </h4>
                        <h5>
                            <b>팀 목록</b>
                            {myTeams
                                ? myTeams.map((item, key) => (
                                      <div key={key} onClick={() => moveToOtherTeam(item.name)}>
                                          {item.name}
                                      </div>
                                  ))
                                : null}
                        </h5>
                        <hr />
                        <h5>
                            <b>투두리스트 목록</b>
                        </h5>
                        {todoTableData.map((item, key) => (
                            <div key={key}>
                                <a key={key} href={'#' + item.id}>
                                    {item.title}
                                </a>
                            </div>
                        ))}
                        <hr />
                    </RoomInfo>
                </Div>
                <Div>
                    <h1 style={{ textAlign: 'center' }} className={'py-3'}>
                        <form onSubmit={clickAddTodoList}>
                            <input
                                type="text"
                                name={'inputRoomName'}
                                className={'mx-3'}
                                placeholder="투두리스트 이름"
                            />
                            <button type="submit" className="btn btn-outline-success mx-3">
                                투두리스트 추가
                            </button>
                        </form>
                        <hr />
                    </h1>
                    {todoTableData.map((item, key) => (
                        <TodoList
                            key={key}
                            todolistId={item.id}
                            title={item.title}
                            creator={item.creator}
                            resTodo={item.resTodos}
                            resDoing={item.resDoings}
                            resDone={item.resDones}
                        />
                    ))}
                </Div>
                {/*<Div>*/}
                {/*  <h1>파일 공유 칸</h1>*/}
                {/*</Div>*/}
            </GridLayout>
            <div id={'3'}></div>
        </>
    )
}

const GridLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 6fr;

    border: 1px solid black;
    margin: 3em 0;
`
const Div = styled.div`
    border: 1px solid black;
`
const RoomInfo = styled.div`
    padding: 5px;
    text-align: center;
`
export default MyteamPage
