import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import styled from 'styled-components'
import userStore from '../../store/userStore'
import todoTableStore from '../../store/todoTableStore'
import doingStore from '../../store/doingStore'
import doneStore from '../../store/doneStore'
import roomData from '../../store/roomData'
import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react'
import { useStore } from 'zustand'
import { render } from 'react-dom'

const AddTddForm = (props) => {
    const { userId, userName, setUserName, setUserId } = userStore()
    const { todoTableData, setTodoTableData } = todoTableStore()
    const { doingDatas, setDoingDatas } = doingStore()
    const { doneDatas, setDoneDatas } = doneStore()
    const [temp, setTemp] = useState(true)
    const { roomName, roomCreator, roomCreateDate } = roomData()
    const [cookie] = useCookies(['token'])

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
                console.log('addTodo', res.data)
                setTodoTableData(res.data)
            })
    }, [])

    const submitAddTdd = (e) => {
        e.preventDefault()

        const content = e.target.todoContent.value

        const addTddData = {
            content: content,
            todoListId: props.todolistId,
            importance: 0,
        }
        if (props.title === 'todo') {
            axios
                .post(process.env.NEXT_PUBLIC_ADD_TDD_CARD + 'todo', null, {
                    params: addTddData,
                    headers: {
                        Authorization: 'Bearer ' + cookie.token,
                    },
                })
                .then((res) => {
                    requestAllTdds()
                })
        } else if (props.title === 'doing') {
            axios
                .post(process.env.NEXT_PUBLIC_ADD_TDD_CARD + 'doing', null, {
                    params: addTddData,
                    headers: {
                        Authorization: 'Bearer ' + cookie.token,
                    },
                })
                .then((res) => {
                    requestAllTdds()
                })
        } else if (props.title === 'done') {
            axios
                .post(process.env.NEXT_PUBLIC_ADD_TDD_CARD + 'done', null, {
                    params: addTddData,
                    headers: {
                        Authorization: 'Bearer ' + cookie.token,
                    },
                })
                .then((res) => {
                    requestAllTdds()
                })
        }

        const requestAllTdds = () => {
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
                    console.log('addTodo', res.data)
                    setTodoTableData(res.data)
                })
        }
    }
    return (
        <div>
            <DropdownButton
                style={{ display: 'inline-block' }}
                variant="outline-success"
                title={props.title + ' 추가하기'}>
                <Form onSubmit={submitAddTdd}>
                    <input
                        type="text"
                        placeholder={'내용'}
                        name={'todoContent'}
                        className={'mb-3'}
                    />
                    <Button variant="outline-secondary" type={'submit'}>
                        추가하기
                    </Button>
                </Form>
            </DropdownButton>
        </div>
    )
}

const Form = styled.form`
    text-align: center;
`

export default AddTddForm
