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

const MyteamPage: NextPage = () => {
    const { userId, userName, setUserName, setUserId } = userStore()
    const [tableData, setTableData] = useState([])
    const [cookie] = useCookies(['token'])
    const { roomName, roomCreator, roomCreateDate } = roomData()
    const { myRooms } = roomList()

    const { todoTableData, setTodoTableData, is_reloadTodoTableData, off_Is_reloadTodoData } =
        todoTableStore()
    useEffect(() => {
        const reqData = {
            teamName: roomName,
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
    }, [])

    // useEffect(() => {
    //     const reqData = {
    //         teamName: roomName,
    //     }
    //     if (todoTableData) {
    //         setTableData(todoTableData)
    //     }
    //
    //     console.log('tableData', tableData)
    // }, [todoTableData])
    // useEffect(() => {
    //     const reqData = {
    //         teamName: roomName,
    //     }
    //     console.log(reqData)
    //
    //     axios
    //         .post(process.env.NEXT_PUBLIC_ALL_TODOLIST, null, {
    //             params: reqData,
    //             headers: {
    //                 Authorization: 'Bearer ' + cookie.token,
    //             },
    //         })
    //         .then((res) => {
    //             console.log('all', res.data)
    //
    //             setTodoTableDatas(res.data)
    //         })
    //     off_Is_reloadTodoData()
    //     console.log('tdds', todoTableData)
    //     console.log('tdds', doingDatas)
    //     console.log('tdds', doneDatas)
    // }, [is_reloadTodoTableData])

    console.log(roomName)
    console.log(roomCreator)
    console.log(roomCreateDate)

    const clickAddTodoList = (e) => {
        e.preventDefault()

        const createRoomData = {
            title: e.target.inputRoomName.value,
            to: userId,
            teamName: roomName,
        }
        console.log(createRoomData)
        axios
            .post(process.env.NEXT_PUBLIC_CREATE_TODOLIST, null, {
                params: createRoomData,
                headers: {
                    Authorization: 'Bearer ' + cookie.token,
                },
            })
            .then((res) => {
                console.log(res.data)

                const reqData = {
                    userId: userId,
                    teamName: roomName,
                }
                console.log(reqData)

                axios
                    .post(process.env.NEXT_PUBLIC_ALL_TODOLIST, null, {
                        params: reqData,
                        headers: {
                            Authorization: 'Bearer ' + cookie.token,
                        },
                    })
                    .then((res) => {
                        console.log('all', res.data)

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
                        <h5>{roomName}</h5>
                        <hr />
                        <h4>
                            <b>팀장</b>
                            {}
                        </h4>
                        <h5>{roomCreator}</h5>
                        <hr />
                        <h4>
                            <b>방 생성일</b>
                        </h4>
                        <h5>{roomCreateDate ? roomCreateDate.slice(0, 10) : null}</h5>
                        <hr />
                        <h5>
                            <b>팀 목록</b>
                            {myRooms
                                ? myRooms.map((item, key) => (
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
