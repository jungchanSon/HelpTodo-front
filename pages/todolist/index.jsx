import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Calendar from '../../components/todolist/Calendar'
import AddTodoForm from '../../components/todolist/AddTodoForm'
import TeamCard from '../../components/TeamCard'
import Line from '../../components/Line'
import todoTableStore from '../../store/todoTableStore'
import roomData from '../../store/roomData'
import Router from 'next/router'
import { EventSourcePolyfill } from 'event-source-polyfill'
import axios, { formToJSON } from 'axios'
import { useCookies } from 'react-cookie'

const TodoList = (props) => {
    const { teamName, setTeamName, setTeamCreator, setTeamCreateDate } = roomData()
    const { todoTableData, setTodoTableData, is_reloadTodoTableData, off_Is_reloadTodoData } =
        todoTableStore()
    const [cookie] = useCookies(['token'])

    useEffect(() => {
        if (!teamName) {
            setTeamName(localStorage.getItem('teamName'))
        } else {
            localStorage.setItem('teamName', teamName)
        }

        const sseForUpdate = new EventSourcePolyfill(
            `${process.env.NEXT_PUBLIC_LOCALURL_BACK}/event/addEmitter?teamName=${teamName}`,
            {
                headers: {
                    Authorization: `Bearer ${cookie.token}`,
                },
            },
        )

        sseForUpdate.addEventListener('updateTodoList', (res) => {
            setTodoTableData(JSON.parse(res.data))
        })
        //----------------------------------------------------------

        const reqData = {
            teamName: teamName,
        }

        axios
            .post(process.env.NEXT_PUBLIC_ALL_TODOLIST, null, {
                params: reqData,
            })
            .then((res) => {
                setTodoTableData(res.data)
            })

        // axios.post(process.env.NEXT_PUBLIC_FIND_MY_MEMBERS, null, {
        //     params: reqData,
        //     headers: {
        //         'Authorization': 'Bearer ' + cookie.token,
        //     },
        // }).then((res) => {
        //     setMyMembers(res.data)
        // })
    }, [])

    const completeTodo = (e) => {
        e.preventDefault()
        const data = {
            teamName: teamName,
            tddId: e.target.id,
        }
        axios
            .delete(process.env.NEXT_PUBLIC_DELETE_TDD_CARD, {
                params: data,
            })
            .then((res) => {
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
                    })
            })
    }

    return (
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
            <div className='flex flex-row align-items-center px-4'>
                <Calendar />
            </div>
            <Line></Line>
            <div className='flex flex-row'>
                <div className='w-4/12'>
                    <AddTodoForm />
                </div>
                <ul role='list' className='w-full divide-y divide-gray-100'>
                    <h3>할 일 목록</h3>
                    {todoTableData ? todoTableData[0].resTodos.map((todo) => (
                        <li
                            key={todo.tddId}
                            className='flex justify-between gap-x-6 py-1 px-3 bg-white border-solid border-1 rounded-3 opacity-80 mb-3'
                        >
                            <div className='flex min-w-0 gap-x-4'>
                                <div className='min-w-0 flex-auto'>
                                    <p className='text-sm font-semibold leading-6 text-gray-900'>
                                        할 일 : {todo.content}
                                    </p>
                                    <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
                                        생성일 : {todo.createDate.substring(0, 10)}
                                    </p>
                                    <button
                                        className={
                                            'border-solid border-2 border-red-500 rounded px-1 hover:bg-red-500 hover:text-white'
                                        }
                                        onClick={completeTodo}
                                        id={todo.tddId}
                                    >
                                        완료
                                    </button>
                                </div>
                            </div>
                            <div className='hidden shrink-0 sm:flex sm:flex-col sm:items-end'>
                                <p className='text-sm leading-6 text-gray-900'>
                                    담당자 : {todo.manager}
                                </p>
                                <div className='mt-1 flex items-center gap-x-1.5'>
                                    <div className='flex-none rounded-full bg-emerald-500/20 p-1'>
                                        <div className='h-1.5 w-1.5 rounded-full bg-emerald-500' />
                                    </div>
                                    <p className='text-xs leading-5 text-gray-500'>
                                        시작일 : {todo.startDate}
                                    </p>
                                </div>
                                <div className='mt-1 flex items-center gap-x-1.5'>
                                    <div className='flex-none rounded-full bg-red-500/20 p-1'>
                                        <div className='h-1.5 w-1.5 rounded-full bg-red-500' />
                                    </div>
                                    <p className='text-xs leading-5 text-gray-500'>
                                        마감일 : {todo.endDate}
                                    </p>
                                </div>
                            </div>
                        </li>
                    )) : null}
                </ul>
            </div>
        </div>
    )
}

export default TodoList
