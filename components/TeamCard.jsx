import roomData from '../store/roomData'
import Router from 'next/router'
import todoTableStore from '../store/todoTableStore'
import axios from 'axios'
import { useState } from 'react'

const TeamCard = ({ name, cDate, creator }) => {
    const { teamName, setTeamName, setTeamCreator, setTeamCreateDate } = roomData()
    const { todoTableData, setTodoTableData, is_reloadTodoTableData, off_Is_reloadTodoData } =
        todoTableStore()

    const enterTeamPage = (e) => {
        e.preventDefault()
        setTeamName(name)
        setTeamCreateDate(cDate)
        setTeamCreator(creator)

        const reqParam = {
            teamName: name,
        }

        axios
            .post(process.env.NEXT_PUBLIC_ALL_TODOLIST, null, {
                params: reqParam,
            })
            .then((res) => {
                setTodoTableData(res.data)
            })

        Router.push('/todolist')
    }

    const exitTeamPage = (e) => {
        e.preventDefault()

        const reqParam = {
            teamName: name,
        }

        axios.post(process.env.NEXT_PUBLIC_EXIT_TEAM, null, {
            params: reqParam,
        })
        Router.reload()
        Router.push('/')
    }

    return (
        <div className="min-h-full flex-1 flex-col justify-center px-6 lg:px-8 lg:mx-auto">
            <div className="flex flex-row justify-content-between mb-6 rounded-lg bg-white p-6 sm:mx-auto sm:w-full sm:max-w-sm mt-4 sm:mx-auto sm:w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
                <h3>{name}</h3>
                <div className="mt-2 flex border-so">
                    <button
                        className="w-content border-solid border-2 mx-2 border-red-600 rounded px-1 hover:bg-red-600 hover:text-white"
                        onClick={exitTeamPage}
                    >
                        탈퇴
                    </button>

                    <button
                        className="w-content border-solid border-2 border-indigo-300 rounded px-1 hover:bg-indigo-300 hover:text-white"
                        onClick={enterTeamPage}
                    >
                        참가
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TeamCard
