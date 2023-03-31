import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import userStore from '../../store/userStore'
import roomData from '../../store/roomData'
import todoTableStore from '../../store/todoTableStore'
import { useCookies } from 'react-cookie'

const TddCard = ({ ttdData, parent }) => {
    const { userId, userName, setUserName, setUserId } = userStore()
    const { roomName, roomCreator, roomCreateDate } = roomData()
    const { todoTableData, setTodoTableData, on_Is_reloadTodoData } = todoTableStore()
    const [cookie] = useCookies(['token'])
    const [detail, setDetail] = useState()

    useEffect(() => {
        // setDetail(ttdData)
    }, [todoTableData])

    const clickDeleteTdd = (e) => {
        e.preventDefault()
        const data = {
            tddId: ttdData.tddId,
        }
        axios
            .delete(process.env.NEXT_PUBLIC_DELETE_TDD_CARD, {
                params: data,
                headers: {
                    Authorization: 'Bearer ' + cookie.token,
                },
            })
            .then((res) => {
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
                        console.log(res.data)
                        setTodoTableData(res.data)
                    })
            })
    }

    const test = () => {
        console.log(ttdData)
        console.log(todoTableData)
        setTodoTableData(todoTableData.filter((user) => user.id !== id))
        console.log(todoTableData)
    }

    if (!ttdData) {
        return
    }
    return (
        <div>
            <TddDiv>
                {ttdData ? (
                    <div className={'card border-dark m-3'} style={{}}>
                        <div className={'card-header'}> {ttdData.createDate.slice(0, 10)} </div>
                        <div className={'card-body text-dark'}>
                            <p className={'card-text'}>{ttdData.content}</p>
                        </div>
                        <button type="button" className="btn btn-danger" onClick={clickDeleteTdd}>
                            삭제
                        </button>
                    </div>
                ) : null}
            </TddDiv>
        </div>
    )
}
const TddDiv = styled.div`
    width: 100%;
`

export default TddCard
