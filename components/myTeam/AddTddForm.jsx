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
import { useEffect, useRef, useState } from 'react'
import { useStore } from 'zustand'
import { render } from 'react-dom'

const AddTddForm = (props) => {
    const { userId, userName, setUserName, setUserId } = userStore()
    const { todoTableData, setTodoTableData } = todoTableStore()
    const { roomName, roomCreator, roomCreateDate } = roomData()
    const [cookie] = useCookies(['token'])
    const [importantLevel, setImportantLevel] = useState(5)

    var slideRef = useRef()
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
            teamName: roomName,
            content: content,
            todoListId: props.todolistId,
            importance: importantLevel,
        }
        console.log(importantLevel)
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
                    <SlideInput
                        type="range"
                        min={0}
                        max={5}
                        step={1}
                        ref={slideRef}
                        onInput={() => {
                            setImportantLevel(slideRef.current.value)
                        }}
                    />
                    <div>중요도 {importantLevel}</div>

                    <br />
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

const SlideInput = styled.input``
export default AddTddForm
